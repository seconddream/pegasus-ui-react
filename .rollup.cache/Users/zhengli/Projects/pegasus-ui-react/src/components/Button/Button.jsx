import { __rest } from "tslib";
import Tooltip from "../Tooltip";
import ButtonBase from "./ButtonBase";
export default function Button(props) {
    var tooltips = props.tooltips, position = props.position, bottonBaseProps = __rest(props, ["tooltips", "position"]);
    if (tooltips) {
        return <Tooltip text={tooltips} position={position}><ButtonBase {...bottonBaseProps}/></Tooltip>;
    }
    else {
        return <ButtonBase {...bottonBaseProps}/>;
    }
}
//# sourceMappingURL=Button.jsx.map