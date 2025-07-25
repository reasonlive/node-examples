import {TitleProps} from "@refinedev/core";
import {FC} from "react";

export const CustomTitle: FC<TitleProps> = (props) => {
    return (
        <div>
            <strong><a href="/" title="bingopay">Bingopay Crypto service</a></strong>
        </div>
    );
}