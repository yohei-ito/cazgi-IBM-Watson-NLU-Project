import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
      return (
        <div>
          {/*You can remove this line and the line below. */}
          {/*JSON.stringify(this.props.emotions)*/}
          <table className="table table-bordered">
            <tbody>
            {
                  Object.entries(this.props.emotions).map(item => {
                        return (
                          <tr>
                              <td>{item[0]}</td>
                              <td>{item[1]}</td>
                          </tr>
                      )
                  })

            }
            </tbody>
          </table>
          </div>
          );
        }

}
export default EmotionTable;
