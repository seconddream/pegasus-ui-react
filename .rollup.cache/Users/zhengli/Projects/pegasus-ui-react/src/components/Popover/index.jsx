import { useEffect, useRef } from 'react';
import { parsePlacement } from '../../shared/interfaces';
import clsx from 'clsx';
import useReveal from '../../hooks/useReveal';
export default function Popover(props) {
    var _a = props.show, show = _a === void 0 ? false : _a, _b = props.block, block = _b === void 0 ? false : _b, _c = props.position, position = _c === void 0 ? 'top' : _c, popover = props.popover, _d = props.animation, animation = _d === void 0 ? 'fade-in' : _d, children = props.children;
    var _e = parsePlacement(position), top = _e.top, bottom = _e.bottom, left = _e.left, right = _e.right, topLeft = _e.topLeft, topRight = _e.topRight, bottomLeft = _e.bottomLeft, bottomRight = _e.bottomRight;
    var targetRef = useRef(null);
    var targetReveal = useReveal(targetRef, animation);
    useEffect(function () {
        if (show) {
            targetReveal.show();
        }
        else {
            targetReveal.hide();
        }
    }, [show, targetReveal]);
    return (<div className={clsx('relative', {})}>
      <div ref={targetRef} className={clsx('absolute hidden z-10', block && 'min-w-full', {
            'bottom-full pb-1.5': top || topLeft || topRight,
            'top-full pt-1.5': bottom || bottomLeft || bottomRight,
            'left-1/2 -translate-x-1/2': top || bottom,
            'left-0': topLeft || bottomLeft,
            'right-0': topRight || bottomRight,
            'right-full pr-1.5': left,
            'left-full pl-1.5': right,
            'top-1/2 -translate-y-1/2': left || right,
        })}>
        {popover}
      </div>
      {children}
    </div>);
}
//# sourceMappingURL=index.jsx.map