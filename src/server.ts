import * as http from "http";
import * as fs from "fs";
import * as querystring from "querystring";
import { Game } from "./Game";
import { Player } from "./Player";
import { Phase } from "./enums/Phase";
import { generateRandomId } from "./utils";
import { IFCreateGameForm } from "./interface/IFCreateGameForm";
import { IFCreatePlayer } from "./interface/IFCreatePlayer";

const serverId = generateRandomId();
const allGames: Map<string, Game> = new Map<string, Game>();
const allPlayers: Map<string, Player> = new Map<string, Player>();

function notFound(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  errorInfo = "",
): void {
  console.warn("Not found", req.method, req.url, errorInfo);
  res.writeHead(404);
  res.write(`Not found ${errorInfo}`);
  res.end();
}

function serveApp(res: http.ServerResponse): void {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.write(fs.readFileSync("index.html"));
  res.end();
}

function serveAsset(req: http.IncomingMessage, res: http.ServerResponse): void {
  if (req.url === undefined) throw new Error("Empty url");
  let isGzip = false;
  const ae = req.headers["accept-encoding"];
  if (ae !== undefined) {
    let aev: string[];
    if (typeof ae === "string") {
      aev = ae.replace(" ", "").split(",");
    } else {
      aev = ae;
    }
    aev.forEach((e) => {
      if (e === "gzip") {
        isGzip = true;
      }
    });
  }

  let filepath = "";
  if (req.url === "/main.js") {
    filepath = "dist/main.js";
  } else if (req.url === "/styles.css") {
    filepath = "dist/styles.css";
  }

  if (isGzip && filepath !== "" && fs.existsSync(`${filepath}.gz`)) {
    console.log(`serveAsset gzip ${filepath}`);
    res.setHeader("Content-Encoding", "gzip");
    res.write(fs.readFileSync(`${filepath}.gz`));
  } else if (req.url === "/main.js") {
    res.setHeader("Content-Type", "text/javascript");
    res.write(fs.readFileSync(filepath));
  } else if (req.url === "/styles.css") {
    res.setHeader("Content-Type", "text/css");
    res.write(fs.readFileSync(filepath));
  } else {
    console.log(`unknown req${req.url}`);
  }
  res.end();
}

function processInput(
  req: http.IncomingMessage,
  res: http.ServerResponse,
): void {
  if (req.url === undefined) {
    notFound(req, res, "req.url === undefined");
    return;
  }
  const playerId: string = req.url.substring("/api/player_input?id=".length);
  const player = allPlayers.get(playerId);
  if (player === undefined) {
    notFound(req, res, "processInput::player === undefined");
    return;
  }
  const game = allGames.get(player.currentGame);
  if (game === undefined) {
    notFound(req, res, "processInput::game === undefined");
    return;
  }
  let body = "";
  req.on("data", (data) => {
    body += data.toString();
  });
  req.once("end", () => {
    try {
      const entity = JSON.parse(body);
      player.process(game, entity);
      res.setHeader("Content-Type", "application/json");
      res.write(player.stateStringify(game));
      res.end();
    } catch (err) {
      res.writeHead(400, {
        "Content-Type": "application/json",
      });
      console.warn("Error processing input from player", err);
      res.write(
        JSON.stringify({
          message: err.message,
        }),
      );
      res.end();
    }
  });
}

function apiGetGame(req: http.IncomingMessage, res: http.ServerResponse): void {
  const routeRegExp = /^\/api\/game\?id=([0-9abcdef]+)$/i;

  if (req.url === undefined) {
    notFound(req, res, "apiGetGame::url not defined");
    return;
  }

  if (!routeRegExp.test(req.url)) {
    notFound(req, res, "apiGetGame::no match with regexp");
    return;
  }

  const matches = req.url.match(routeRegExp);

  if (matches === null || matches[1] === undefined) {
    notFound(req, res, "apiGetGame::didn't find game id");
    return;
  }

  const gameId: string = matches[1];

  const game = allGames.get(gameId);

  if (game === undefined) {
    notFound(req, res, "apiGetGame::game is undefined");
    return;
  }

  res.setHeader("Content-Type", "application/json");
  res.write(game.infoStringify());
  res.end();
}

function apiGetWaitingFor(
  req: http.IncomingMessage,
  res: http.ServerResponse,
): void {
  if (req.url === undefined) {
    notFound(req, res, "apiGetWaitingFor::url not defined");
    return;
  }
  const qs: string = req.url.substring("/api/waiting_for?".length);
  const queryParams = querystring.parse(qs) as Record<string, string>;
  const playerId = queryParams.id;
  const prevGameAge = parseInt(queryParams["prev-game-age"], 10);
  const player = allPlayers.get(playerId);
  if (player === undefined) {
    notFound(req, res, `apiGetWaitingFor::player is undefined with id = ${playerId}`);
    return;
  }
  const game = allGames.get(player.currentGame);
  if (game === undefined) {
    notFound(req, res, "apiGetWaitingFor::game is undefined");
    return;
  }

  res.setHeader("Content-Type", "application/json");
  const answer = {
    result: "WAIT",
    player: player.name,
  };
  if (player.getWaitingFor() !== undefined || game.phase === Phase.END) {
    answer.result = "GO";
  } else if (game.needRefresh(prevGameAge)) {
    answer.result = "REFRESH";
  }
  res.write(JSON.stringify(answer));
  res.end();
}

function apiGetPlayerState(
  req: http.IncomingMessage,
  res: http.ServerResponse,
): void {
  if (req.url === undefined) {
    console.warn("url not defined");
    notFound(req, res);
    return;
  }
  const playerId: string = req.url.substring("/api/player_state?id=".length);
  const player = allPlayers.get(playerId);
  if (player === undefined) {
    notFound(req, res, "apiGetPlayerState::player === undefined");
    return;
  }
  const game = allGames.get(player.currentGame);
  if (game === undefined) {
    notFound(req, res, "apiGetPlayerState::game === undefined");
    return;
  }

  res.setHeader("Content-Type", "application/json");
  res.write(player.stateStringify(game));
  res.end();
}

function createGame(req: http.IncomingMessage, res: http.ServerResponse): void {
  let body = "";
  req.on("data", (data) => {
    body += data.toString();
  });
  req.once("end", () => {
    try {
      const gameReq = JSON.parse(body);
      const createGameForm = gameReq as IFCreateGameForm;
      const gameId = generateRandomId();
      const players = createGameForm.players.map(
        (obj: IFCreatePlayer) => new Player(obj.name as string, obj.color),
      );
      let firstPlayer = players[0];
      for (let i = 0; i < createGameForm.players.length; i += 1) {
        if (createGameForm.players[i].first === true) {
          firstPlayer = players[i];
          break;
        }
      }

      const game = new Game(gameId, players, firstPlayer, createGameForm);
      allGames.set(gameId, game);
      game.players.forEach((player) => {
        allPlayers.set(player.id, player);
        player.setCurrentGame(game.id);
      });
      res.setHeader("Content-Type", "application/json");
      res.write(game.infoStringify());
    } catch (err) {
      console.warn("error creating game", err);
      res.writeHead(500);
      res.write("Unable to create game");
    }
    res.end();
  });
}

function requestHandler(
  req: http.IncomingMessage,
  res: http.ServerResponse,
): void {
  console.log(`${req.url} ${req.method}`);
  if (req.url === undefined) {
    notFound(req, res);
    return;
  }
  if (req.method === "PUT") {
    if (req.url === "/create_game") {
      createGame(req, res);
    } else {
      notFound(req, res);
    }
  } else if (req.method === "POST") {
    if (req.url.startsWith("/api/player_input?id=")) {
      processInput(req, res);
    } else {
      notFound(req, res);
    }
  } else if (req.method === "GET") {
    if (req.url.startsWith("/api/server?id=")) {
      notFound(req, res);
    } else if (
      req.url === "/"
      || req.url.startsWith("/new_game")
      || req.url.startsWith("/game?id=")
      || req.url.startsWith("/player?id=")
    ) {
      serveApp(res);
    } else if (req.url.startsWith("/api/player_state?id=")) {
      apiGetPlayerState(req, res);
    } else if (req.url.startsWith("/api/waiting_for?id=")) {
      apiGetWaitingFor(req, res);
    } else if (req.url.startsWith("/api/game?id=")) {
      apiGetGame(req, res);
    } else if (
      req.url.startsWith("/assets/")
      || req.url === "/main.js"
      || req.url === "/styles.css"
    ) {
      serveAsset(req, res);
    } else {
      notFound(req, res);
    }
  }
}

const server: http.Server = http.createServer(requestHandler);
console.log(`Starting server on port ${process.env.PORT || 9854}`);
server.listen(process.env.PORT || 9854);

console.log(`\nThe secret serverId for this server is ${serverId}`);
