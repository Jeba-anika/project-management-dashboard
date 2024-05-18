import { Popover } from "antd";

const CommonPopover = ({ children, position, title, content, }) => {
    return (
        <Popover placement={position} title={title} content={content}>{children}</Popover>
    );
};

export default CommonPopover;