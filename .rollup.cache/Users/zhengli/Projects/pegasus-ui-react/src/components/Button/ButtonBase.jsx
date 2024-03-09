import clsx from 'clsx';
import { useRef } from 'react';
import { AiOutlineCheckCircle, AiOutlineExclamationCircle, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FixedHeightItemSizeStyles } from '../../shared/styles';
var ButtonTheme = {
    primary: 'bg-primary text-white hover:brightness-150 active:brightness-75',
    secondary: 'bg-white text-primary hover:bg-primary-light active:brightness-90 border border-dark',
    transparent: 'bg-transparnet text-primary hover:bg-primary-light active:brightness-90',
    disabled: 'bg-disabled text-deactivated',
    success: 'bg-success text-white',
    error: 'bg-warning text-white hover:brightness-110 active:brightness-90',
    danger: 'bg-danger text-white hover:brightness-110 active:brightness-90',
};
export default function ButtonBase(props) {
    var id = props.id, _a = props.size, size = _a === void 0 ? 'md' : _a, _b = props.block, block = _b === void 0 ? false : _b, _c = props.loading, loading = _c === void 0 ? false : _c, _d = props.error, error = _d === void 0 ? false : _d, _e = props.type, type = _e === void 0 ? 'secondary' : _e, _f = props.shape, shape = _f === void 0 ? 'rounded' : _f, _g = props.success, success = _g === void 0 ? false : _g, _h = props.disabled, disabled = _h === void 0 ? false : _h, _j = props.danger, danger = _j === void 0 ? false : _j, icon = props.icon, _k = props.iconPosition, iconPosition = _k === void 0 ? 'left' : _k, _l = props.focusable, focusable = _l === void 0 ? false : _l, onClick = props.onClick, children = props.children;
    var circle = shape === 'circle';
    var normalState = !loading && !success && !error && !disabled;
    var shouldInteract = !loading && !success && !disabled;
    var shouldOverWriteIcon = loading || success || error;
    var _m = FixedHeightItemSizeStyles[size], squireSize = _m.squireSize, height = _m.height, px = _m.px, gap = _m.gap, fontSize = _m.fontSize, iconSize = _m.iconSize, roundCorner = _m.roundCorner;
    var buttonRef = useRef(null);
    return (<div id={id} ref={buttonRef} tabIndex={focusable && shouldInteract ? 0 : undefined} className={clsx(
        // basic
        'flex flex-shrink-0 font-medium whitespace-nowrap justify-center items-center transition-all ease-out', 
        // sizing
        circle || !children ? squireSize : [height, px], block && !circle && !children && 'w-full', circle ? 'rounded-full' : roundCorner, fontSize, gap, 
        // color
        normalState && danger && ButtonTheme.danger, normalState && !danger && ButtonTheme[type], !normalState && (loading || disabled) && ButtonTheme.disabled, !normalState && success && ButtonTheme.success, !normalState && error && ButtonTheme.error, 
        // shadow
        type !== 'transparent' && 'shadow-sm', 
        // interaction
        shouldInteract
            ? 'hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-highlight'
            : 'hover:cursor-not-allowed')} onClick={function (e) {
            var _a, _b, _c;
            e.preventDefault();
            e.stopPropagation();
            if (!shouldInteract) {
                return;
            }
            (_a = buttonRef.current) === null || _a === void 0 ? void 0 : _a.classList.add('animate-signal');
            (_b = buttonRef.current) === null || _b === void 0 ? void 0 : _b.addEventListener('animationend', function () {
                var _a;
                (_a = buttonRef.current) === null || _a === void 0 ? void 0 : _a.classList.remove('animate-signal');
            });
            (_c = buttonRef.current) === null || _c === void 0 ? void 0 : _c.blur();
            onClick === null || onClick === void 0 ? void 0 : onClick(e);
        }} onKeyDown={function (e) {
            var _a;
            if (focusable && e.key === 'Enter' && shouldInteract) {
                (_a = buttonRef.current) === null || _a === void 0 ? void 0 : _a.blur();
                onClick === null || onClick === void 0 ? void 0 : onClick();
            }
        }}>
      {iconPosition === 'right' && shape !== 'circle' && children}
      {(shouldOverWriteIcon || icon) && (<span className={clsx(iconSize, { 'animate-spin': loading })}>
          {loading && <AiOutlineLoading3Quarters />}
          {success && <AiOutlineCheckCircle />}
          {error && <AiOutlineExclamationCircle />}
          {!shouldOverWriteIcon && icon ? icon : null}
        </span>)}
      {iconPosition === 'left' && shape !== 'circle' && children}
    </div>);
}
//# sourceMappingURL=ButtonBase.jsx.map