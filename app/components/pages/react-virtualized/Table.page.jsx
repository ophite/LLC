import { data, columns } from './gridData'
import GoldenComponentPage from '../layouts/GoldenComponent.page.jsx';
import { generateRandomList } from './demo/utils'
import Table from './demo/Table.example';
import Immutable from 'immutable'
const list = Immutable.List(generateRandomList());


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
                <Table
                    list={list}
                />
            </div>
        );
    }
}

export default TablePage;
