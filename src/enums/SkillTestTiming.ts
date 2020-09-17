export enum SkillTestTiming {
  START,
  DETERMINE, // ST.1 Determine skill of test. Skill test of that type begins.
  TRIGGER_WINDOW1, // PLAYER WINDOW
  COMMIT_CARDS, // ST.2 Commit cards from hand to skill test.
  TRIGGER_WINDOW2, //  PLAYER WINDOW
  REVEAL_CHAOS, // ST.3 Reveal chaos token.
  RESOLVE_CHAOS_EFFECTS, // ST.4 Resolve chaos symbol effect(s).
  MODIFIED_SKILL, // ST.5 Determine investigator's modified skill value.
  DETERMINE_RESULT, // ST.6 Determine success/failure of skill test.
  APPLY_RESULT, // ST.7 Apply skill test results.
  SKILL_TEST_END, // ST.8 Skill test ends.
}
