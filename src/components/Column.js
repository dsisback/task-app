import React from "react";
import styledComponents from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";

import Task from "./Task";

const Container = styledComponents.div`
margin: 8px;
border: 1px solid lightgrey;
border-radius: 2px;
width: 220px;
background-color:white;

display:flex;
flex-direction: column;
`;
const Title = styledComponents.h3`
padding: 8px;
`;
const TaskList = styledComponents.div`
padding: 8px;
transition: background-color 0.2s ease;
background-color: ${(props) => (props.isDraggingOver ? "skyblue" : "white")};
flex-grow: 1;
min-height: 100px;
`;

class Column extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.column.id} index={this.props.index}>
        {(provided) => (
          <Container {...provided.draggableProps} ref={provided.innerRef}>
            <Title {...provided.dragHandleProps}>
              {this.props.column.title}
            </Title>
            <Droppable
              droppableId={this.props.column.id}
              isDropDisabled={this.props.isDropDisabled}
              type="task"
            >
              {(provided, snapshot) => (
                <TaskList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {this.props.tasks.map((task, index) => (
                    <Task key={task.id} task={task} index={index} />
                  ))}
                  {provided.placeholder}
                </TaskList>
              )}
            </Droppable>
          </Container>
        )}
      </Draggable>
    );
  }
}

export default Column;
