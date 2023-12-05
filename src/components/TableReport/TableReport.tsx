import { useState, useEffect } from 'react';
import { Report } from '../../models/Report';

function TableReport({ data } : { data: Report[] } ) {
    const [report, setReport] = useState(Array<any>())
    
    return (
        <>
            {data.length === 0 && <p className="text-center p-4">👀 Report not found, please select at least a column</p>}
            {data.length > 0 &&
                <table>
                    {data.map(info =>
                        <tr>
                            {Object.keys( key => <th></th>)}
                        </tr>
                    )}
                </table>
            }
        </>
    )
}

export default TableReport