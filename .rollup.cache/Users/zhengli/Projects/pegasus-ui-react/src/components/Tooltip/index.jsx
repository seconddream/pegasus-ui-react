import { useMemo, useState } from 'react';
import Popover from '../Popover';
import Label from '../Label';
export default function Tooltips(props) {
    var text = props.text, _a = props.position, position = _a === void 0 ? 'bottom' : _a, children = props.children;
    var _b = useState(false), show = _b[0], SetShow = _b[1];
    var animation = useMemo(function () {
        switch (position) {
            case 'top':
            case 'topLeft':
            case 'topRight':
                return 'centered-slide-up';
            case 'bottom':
            case 'bottomLeft':
            case 'bottomRight':
                return 'centered-slide-down';
            default:
                return 'fade-in';
        }
    }, [position]);
    return (<div onMouseEnter={function () {
            SetShow(true);
        }} onMouseLeave={function () {
            SetShow(false);
        }}>
      <Popover show={show} popover={<Label text={text} color='dark' shadow/>} position={position} animation={animation}>
        {children}
      </Popover>
    </div>);
}
//# sourceMappingURL=index.jsx.map