import React from 'react';
import s from "./pagination.module.css";
import {getPostsOnPage} from "../../utils/pages";

const Pagination = ({totalPagesCount, page, changePage}) => {

    let pagesArray = getPostsOnPage(totalPagesCount)

    return (
        <div className={s.page__wrapper}>
            {pagesArray.map(p =>
                <span key={p}
                      className={p === page ? s.active : s.page}
                      onClick={() => changePage(p)}
                >{p}</span>
            )}
        </div>
    );
};

export default Pagination;
