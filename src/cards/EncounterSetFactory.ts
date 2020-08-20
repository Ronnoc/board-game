import { EncounterSet } from "../enums/EncounterSet";
import { IEncounterSet } from "./IEncounterSet";
import { CoreEncounterSets } from "./core/CoreEncounterSets";

export const EncounterSetFactory = new Map<EncounterSet, typeof IEncounterSet>();

function insertEncounterSet(XIEncounterSet: typeof IEncounterSet): void {
  if (XIEncounterSet.cSetName !== EncounterSet.UNKNOWN) {
    EncounterSetFactory.set(XIEncounterSet.cSetName, XIEncounterSet);
  } else {
    console.warn(`${(new XIEncounterSet()).mName} has no EncounterSet.cSetName`);
  }
}

CoreEncounterSets.forEach(insertEncounterSet);
console.log(`cards/EncounterSetFactory.ts:: insertEncounterSet size ${EncounterSetFactory.size}`);
