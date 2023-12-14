import React, { FC, useState } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import { CardWrapper } from "@src/components/common/CardWrapper";
import { MoreHorizontal } from "react-feather";
import { RippleButton } from "@src/components/common/ripple-button";
import { Card } from "reactstrap";
import ReactFlow from "react-flow-renderer";
import { CustomNodeComponent } from "./CustomNode/CustomNode";
const elements = [
  {
    id: "1",
    type: "special", // input node
    data: { text: "CEO", color: "info", noTop: true },
    position: { x: 100, y: 25 },
  },
  // default node
  {
    id: "2",
    type: "special",
    // you can also pass a React component as a label
    data: { text: "COO", color: "warning" },
    position: { x: 0, y: 125 },
  },
  {
    id: "3",
    type: "special",
    // you can also pass a React component as a label
    data: { text: "Operations Associate", color: "warning", size: "sm" },
    position: { x: 0, y: 185 },
  },
  {
    id: "4",
    type: "special",
    // you can also pass a React component as a label
    data: {
      text: "Operations Analyst",
      color: "warning",
      size: "sm",
      noBottom: true,
    },
    position: { x: 0, y: 245 },
  },
  {
    id: "5",
    type: "special",
    // you can also pass a React component as a label
    data: { text: "CTO", color: "success" },
    position: { x: 190, y: 125 },
  },
  {
    id: "6",
    type: "special",
    // you can also pass a React component as a label
    data: { text: "Product Manager", color: "success", size: "sm" },
    position: { x: 190, y: 185 },
  },
  {
    id: "7",
    type: "special",
    // you can also pass a React component as a label
    data: { text: "UX Designer", color: "success", size: "sm" },
    position: { x: 190, y: 245 },
  },
  {
    id: "7",
    type: "special",
    // you can also pass a React component as a label
    data: { text: "Head Developer", color: "success", size: "sm" },
    position: { x: 190, y: 305 },
  },
  {
    id: "8",
    type: "special",
    // you can also pass a React component as a label
    data: { text: "Product Manager", color: "success", size: "sm" },
    position: { x: 190, y: 365 },
  },
  {
    id: "9",
    type: "special",
    // you can also pass a React component as a label
    data: { text: "Product Manager", color: "success", size: "sm" },
    position: { x: 190, y: 425 },
  },
  {
    id: "10",
    type: "special",
    // you can also pass a React component as a label
    data: { text: "UX Designer", color: "success", size: "sm" },
    position: { x: 190, y: 485 },
  },
  {
    id: "11",
    type: "special",
    // you can also pass a React component as a label
    data: { text: "Head Developer", color: "success", size: "sm" },
    position: { x: 190, y: 545 },
  },
  {
    id: "12",
    type: "special",
    // you can also pass a React component as a label
    data: {
      text: "Finish",
      color: "info",
      noBottom: true,
    },
    position: { x: 100, y: 645 },
  },
  //   {
  //     id: "13",
  //     type: "output", // output node
  //     data: { label: "Output Node" },
  //     position: { x: 250, y: 250 },
  //   },
  // animated edge
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e3-4", source: "3", target: "4" },
  { id: "e1-5", source: "1", target: "5" },
  { id: "e5-6", source: "5", target: "6" },
  { id: "e6-7", source: "6", target: "7" },
  { id: "e7-8", source: "7", target: "8" },
  { id: "e8-9", source: "8", target: "9" },
  { id: "e9-10", source: "9", target: "10" },
  { id: "e10-11", source: "10", target: "11" },
  { id: "e11-12", source: "11", target: "12" },
];

const nodeTypes = {
  special: CustomNodeComponent,
};
const Workflow: FC = (): JSX.Element => {
  return (
    <CardWrapper
      title="Workflow"
      headerChild={
        <RippleButton size="sm" color="light">
          <MoreHorizontal size={18} />
        </RippleButton>
      }
      borderBottom
    >
      <div style={{ height: 700 }}>
        <ReactFlow
          elements={elements}
          zoomOnPinch={false}
          draggable={false}
          nodesDraggable={false}
          //@ts-ignore
          nodeTypes={nodeTypes}
        ></ReactFlow>
      </div>
    </CardWrapper>
  );
};

export { Workflow };
