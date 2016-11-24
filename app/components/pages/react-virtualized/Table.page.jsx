import { data, columns } from './gridData'

class GridPage extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            groupingColumns: [
                'country',
                'grade',
            ],
            dataSource: data,
        };
    }

    render() {
        return (
            <div>
               react-virtualized
            </div>
        );
    }
}

export default GridPage;
