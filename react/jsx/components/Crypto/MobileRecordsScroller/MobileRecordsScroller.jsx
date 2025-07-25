import {Layout} from "antd";
import s from './MobileRecordsScroller.module.css';
import JsPageHelper from "../../../utils/JsPageHelper";

const MobileRecordsScroller = ({columns, dataSource}) => {

    return (
        <Layout>
            {dataSource.map((record, index) =>
                <div className={s.recordItem}>
                    {Object.keys(record).map((item, index) => {
                        return columns[item]
                            ? (<div className={s.propertyWrapper}>
                                    <div className={s.propertyTitle}>{columns[item].title}</div>
                                    <div className={s.propertyValue}>
                                        {
                                            record[item]
                                            ? (columns[item].type === 'date'
                                                    ? JsPageHelper.formatDate(record[item])
                                                    : (columns[item].type === 'string' && record[item].length > 35
                                                            ? JsPageHelper.renderShortCopyableString(record[item], 35)
                                                            : record[item]
                                                        )
                                                )
                                            : (columns[item].type === 'number' ? 0 : 'No')
                                        }
                                    </div>
                                </div>)
                            : ''
                        }
                    )}
                </div>
            )
            }
        </Layout>
    )
        ;
}

export default MobileRecordsScroller;