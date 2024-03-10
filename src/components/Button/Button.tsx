import Tooltip from "../Tooltip";
import ButtonBase, { ButtonBaseProps } from "./ButtonBase";
import { WithPlacement } from "../../shared/interfaces";

export interface ButtonProps extends ButtonBaseProps, WithPlacement{
  tooltip?: string
}

export default function Button(props: ButtonProps){
  const {tooltip, position, ...bottonBaseProps} = props
  if(tooltip){
    return <Tooltip text={tooltip} position={position}><ButtonBase {...bottonBaseProps} /></Tooltip>
  }else{
    return <ButtonBase {...bottonBaseProps} />
  }
}