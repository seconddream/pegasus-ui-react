import { useCallback } from 'react';
import { AnimationClassMap } from '../shared/interfaces';
export default function useReveal(ref, show, hide) {
    var _show = useCallback(function () {
        var _a, _b, _c, _d;
        var isHidden = (_a = ref.current) === null || _a === void 0 ? void 0 : _a.classList.contains('hidden');
        if (isHidden) {
            (_b = ref.current) === null || _b === void 0 ? void 0 : _b.addEventListener('animationend', function () {
                var _a;
                (_a = ref.current) === null || _a === void 0 ? void 0 : _a.classList.remove(AnimationClassMap[show !== null && show !== void 0 ? show : 'fade-in']);
            }, { once: true });
            (_c = ref.current) === null || _c === void 0 ? void 0 : _c.classList.add(AnimationClassMap[show !== null && show !== void 0 ? show : 'fade-in']);
            (_d = ref.current) === null || _d === void 0 ? void 0 : _d.classList.remove('hidden');
        }
    }, [ref, show]);
    var _hide = useCallback(function () {
        var _a, _b, _c;
        var isHidden = (_a = ref.current) === null || _a === void 0 ? void 0 : _a.classList.contains('hidden');
        if (!isHidden) {
            (_b = ref.current) === null || _b === void 0 ? void 0 : _b.addEventListener('animationend', function () {
                var _a, _b;
                (_a = ref.current) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
                (_b = ref.current) === null || _b === void 0 ? void 0 : _b.classList.remove(AnimationClassMap[hide !== null && hide !== void 0 ? hide : 'fade-out']);
            }, { once: true });
            (_c = ref.current) === null || _c === void 0 ? void 0 : _c.classList.add(AnimationClassMap[hide !== null && hide !== void 0 ? hide : 'fade-out']);
        }
    }, [ref]);
    var toggle = useCallback(function () {
        var _a;
        var isHidden = (_a = ref.current) === null || _a === void 0 ? void 0 : _a.classList.contains('hidden');
        if (isHidden) {
            _show();
        }
        else {
            _hide();
        }
    }, [show, hide]);
    return { show: _show, hide: _hide, toggle: toggle };
}
//# sourceMappingURL=useReveal.js.map