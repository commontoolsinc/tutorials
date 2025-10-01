/// <cts-enable />
import {
  cell,
  h,
  recipe,
  UI,
  lift,
  derive,
  handler,
  type Cell,
} from "commontools";

export default recipe("state test", () => {
  const characterName = cell<string>("");
  characterName.set("Lady Ellyxir");
  const dex = cell<number>(16);

  const calcAC = (dex: number) : number =>
    20 + Math.floor((dex - 10) / 2);
  const ac = lift(calcAC)(dex);

  const updateName = handler<
    { detail: { message: string } },
    { characterName: Cell<string> }
  >(
    (event, { characterName }) => {
      console.log("Updating character name to:", event.detail.message);
      characterName.set(event.detail.message);
    }
  );

  return {
    [UI]: (
      <div>
        <h2>Character name: {characterName}</h2>
        <common-send-message
          name="Update"
          placeholder="Update Name"
          onmessagesend={updateName({ characterName })}
        />
        <li>DEX: {dex}</li>
        <li>DEX Modifier: {Math.floor((dex - 10) / 2)}</li>
        <li>AC: {ac}</li>
      </div>
    ),
  };
});
