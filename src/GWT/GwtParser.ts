export interface IAction {
  id: number;
  title: string;
  paneId: number;
}

export interface IPane {
  id: number;
  title: string;
  content: string;
  actionIds: number[];
}

export const parsePanes = (gwt: any) => {
  return Object.keys(gwt.Panes).map(key => ({
    id: gwt.Panes[key].Id,
    title: gwt.Panes[key].Title,
    content: gwt.Panes[key].Body[0].Content,
    actionIds: gwt.Panes[key].Actions
  }));
};

export const parseActions = (gwt: any) => {
  return Object.keys(gwt.Actions).map(key => ({
    id: gwt.Actions[key].Id,
    title: gwt.Actions[key].Title,
    paneId: gwt.Actions[key].Pane
  }));
};

export const getPane = (panes: Array<IPane>, paneId: number): IPane => {
  console.log("getPane() called with ", paneId);
  const matchedPanes = panes.filter(pane => pane.id === paneId);
  if (matchedPanes.length === 0)
    throw new Error(
      `Couldnt find action with id = ${paneId} in ${paneId} array`
    );
  console.log(
    `SUCCESS: Found ${paneId} pane in ${panes} array = ${matchedPanes[0]}`
  );
  return matchedPanes[0];
};

export const getAction = (
  actions: Array<IAction>,
  actionId: number
): IAction => {
  console.log("getAction() called with ", actionId);
  const matchedActions = actions.filter(action => action.id === actionId);
  if (matchedActions.length === 0)
    throw new Error(
      `Couldnt find action with id = ${actionId} in ${actions} array`
    );
  console.log(
    `SUCCESS: Found ${actionId} action in ${actions} array = ${
      matchedActions[0]
    }`
  );
  return matchedActions[0];
};
