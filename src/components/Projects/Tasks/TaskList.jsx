import { List, Skeleton } from 'antd';
import { Draggable } from 'react-beautiful-dnd';

const TaskList = ({ list }) => {
    return (
        <List
            className="demo-loadmore-list"

            itemLayout="horizontal"

            dataSource={list}
            renderItem={(item, index) => (
                <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
                    {(draggableProvided, draggableSnapshot) => (
                        <List.Item ref={draggableProvided.innerRef}
                            {...draggableProvided.draggableProps}
                            {...draggableProvided.dragHandleProps}
                            actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
                        >
                            <Skeleton avatar title={false} loading={item.loading} active>
                                <List.Item.Meta

                                    title={<a href="https://ant.design">{item.name?.last}</a>}
                                    description={item.name}
                                />
                                <div>{item.id}</div>
                            </Skeleton>
                        </List.Item>)}
                </Draggable>
            )}
        />
    );
};

export default TaskList;