import React, { Component } from "react";
import { PrimaryButton } from "@fluentui/react";
import {
  getAction,
  getPane,
  IAction,
  IPane,
  parseActions,
  parsePanes
} from "./GwtParser";

interface IGwtListViewProps {
  gwtDocument: Object;
}

interface IGwtListViewState {
  panesToShow: number[];
}

export class GWTListView extends Component<
  IGwtListViewProps,
  IGwtListViewState
> {
  constructor(props: IGwtListViewProps) {
    super(props);
    this.state = {
      panesToShow: [1]
    };
    this.onActionSelect = this.onActionSelect.bind(this);
  }

  addTargetPaneAfterCurrentPaneInPanes = (
    panes: number[],
    currentPane: number,
    targetPane: number
  ): number[] => {
    let outputPanes = [];
    for (const pane of panes) {
      outputPanes.push(pane);
      if (pane === currentPane) break;
    }
    outputPanes.push(targetPane);
    return outputPanes;
  };

  onActionSelect(currentPaneId: number, targetPaneId: number) {
    console.log("user selected action that leads to pane Id = ", targetPaneId);

    this.setState(prevState => ({
      panesToShow: this.addTargetPaneAfterCurrentPaneInPanes(
        prevState.panesToShow,
        currentPaneId,
        targetPaneId
      )
    }));
    console.log("panesToShow = ", this.state.panesToShow);
  }

  render() {
    return (
      <div>
        <h1>Windows Activation GWT App</h1>
        <ol>
          {this.state.panesToShow.map((paneId: number) => {
            // @ts-ignore
            return (
              <li key={paneId}>
                <GwtPane
                  pane={getPane(parsePanes(this.props.gwtDocument), paneId)}
                  actions={parseActions(this.props.gwtDocument)}
                  onActionSelect={this.onActionSelect}
                />
              </li>
            );
          })}
        </ol>
      </div>
    );
  }
}

interface IGwtPaneProps {
  pane: IPane;
  actions: Array<IAction>;
  onActionSelect: (currentPaneId: number, targetPaneId: number) => void;
}

const GwtPane = (props: IGwtPaneProps) => {
  const actions = props.pane.actionIds.map((actionId: number) => {
    const action = getAction(props.actions, actionId);
    return (
      <GwtPaneOption
        content={action.title}
        currentPaneId={props.pane.id}
        targetPaneId={action.paneId}
        onOptionSelect={props.onActionSelect}
      />
    );
  });
  return (
    <div>
      <h3>{props.pane.title}</h3>
      <div dangerouslySetInnerHTML={{ __html: props.pane.content }} />
      <div>{actions}</div>
    </div>
  );
};

interface IGwtPaneOptionProps {
  content: string;
  currentPaneId: number;
  targetPaneId: number;
  onOptionSelect: (currentPaneId: number, targetPaneId: number) => void;
}

const GwtPaneOption = (props: IGwtPaneOptionProps) => (
  <div className="list-item">
    <PrimaryButton
      onClick={() => {
        props.onOptionSelect(props.currentPaneId, props.targetPaneId);
      }}
    >
      {props.content}
    </PrimaryButton>
  </div>
);
