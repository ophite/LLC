import { data, columns } from './gridData'
import GoldenComponentPage from '../layouts/GoldenComponent.page.jsx';


class TablePage extends GoldenComponentPage {

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
            <div ref={(ref) => this.goldenWindow = ref}>
                react-virtualized
            </div>
        );
    }
}

export default TablePage;
