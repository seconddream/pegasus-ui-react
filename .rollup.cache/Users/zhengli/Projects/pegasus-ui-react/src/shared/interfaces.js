var _a;
export function parseDirection(direction) {
    return {
        horizontal: direction === 'horizontal',
        vertical: direction === 'vertical',
    };
}
export function parsePlacement(position) {
    return {
        top: position === 'top',
        bottom: position === 'bottom',
        left: position === 'left',
        right: position === 'right',
        topLeft: position === 'topLeft',
        topRight: position === 'topRight',
        bottomLeft: position === 'bottomLeft',
        bottomRight: position === 'bottomRight',
    };
}
export var AnimationClassMap = (_a = {},
    _a['fade-in'] = 'animate-fade-in',
    _a['fade-out'] = 'animate-fade-out',
    _a['slide-up'] = 'animate-slide-up',
    _a['slide-down'] = 'animate-slide-down',
    _a['centered-slide-up'] = 'animate-centered-slide-up',
    _a['centered-slide-down'] = 'animate-centered-slide-down',
    _a);
//# sourceMappingURL=interfaces.js.map