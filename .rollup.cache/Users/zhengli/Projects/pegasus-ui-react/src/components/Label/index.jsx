import clsx from 'clsx';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FixedHeightItemSizeStyles } from '../../shared/styles';
var LabelColors = {
    dark: {
        border: 'border-slate-700',
        text: 'text-white',
        bg: 'bg-slate-700'
    },
    white: {
        border: 'border-slate-600',
        text: 'text-slate-700',
        bg: 'bg-white',
    },
    gray: {
        border: 'border-slate-500',
        text: 'text-slate-500',
        bg: 'bg-slate-100',
    },
    amber: {
        border: 'border-amber-600',
        text: 'text-amber-600',
        bg: 'bg-amber-100',
    },
    emerald: {
        border: 'border-emerald-600',
        text: 'text-emerald-600',
        bg: 'bg-emerald-100',
    },
    teal: {
        border: 'border-teal-600',
        text: 'text-teal-600',
        bg: 'bg-teal-100',
    },
    sky: {
        border: 'border-sky-600',
        text: 'text-sky-600',
        bg: 'bg-sky-100',
    },
    indigo: {
        border: 'border-indigo-600',
        text: 'text-indigo-600',
        bg: 'bg-indigo-100',
    },
    fuchsia: {
        border: 'border-fuchsia-600',
        text: 'text-fuchsia-600',
        bg: 'bg-fuchsia-100',
    },
    pink: {
        border: 'border-pink-600',
        text: 'text-pink-600',
        bg: 'bg-pink-100',
    },
    red: {
        border: 'border-red-600',
        text: 'text-red-600',
        bg: 'bg-red-100',
    },
};
export default function Label(props) {
    var _a;
    var id = props.id, _b = props.size, size = _b === void 0 ? 'xs' : _b, _c = props.color, color = _c === void 0 ? 'dark' : _c, _d = props.bordered, bordered = _d === void 0 ? false : _d, _e = props.shadow, shadow = _e === void 0 ? false : _e, icon = props.icon, text = props.text, onClick = props.onClick, onClose = props.onClose;
    var _f = FixedHeightItemSizeStyles[size], height = _f.height, px = _f.px, fontSize = _f.fontSize, iconSize = _f.iconSize, gap = _f.gap, roundCorner = _f.roundCorner;
    return (<div onClick={function (e) {
            e.preventDefault();
            e.stopPropagation();
            onClick === null || onClick === void 0 ? void 0 : onClick(e);
        }} id={id} className={clsx('flex whitespace-nowrap hyphens-auto justify-center items-center', 
        // sizing
        height, px, fontSize, gap, roundCorner, 
        // color
        LabelColors[color].text, LabelColors[color].bg, (_a = {}, _a["border ".concat(LabelColors[color].border)] = bordered, _a['shadow'] = shadow, _a))}>
      {icon && <span className={clsx(iconSize)}>{icon}</span>}
      {text}
      {onClose && <AiOutlineCloseCircle className={clsx(iconSize)} onClick={function (e) {
                e.preventDefault();
                e.stopPropagation();
                onClose();
            }}/>}
    </div>);
}
//# sourceMappingURL=index.jsx.map