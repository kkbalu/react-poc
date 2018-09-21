import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CheckboxTree from 'react-checkbox-tree'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import matchSorter from 'match-sorter'
import TreeActions from '../Redux/TreeRedux'
import DropdownTreeSelect from 'react-dropdown-tree-select'
import 'react-dropdown-tree-select/dist/styles.css'

const data = {
  label: 'search me',
  value: 'searchme',
  children: [
    {
      label: 'search me too',
      value: 'searchmetoo',
      children: [
        {
          label: 'No one can get me',
          value: 'anonymous'
        }
      ]
    }
  ]
}

const onChange = (currentNode, selectedNodes) => {
  console.log('onChange::', currentNode, selectedNodes)
}
const onAction = ({ action, node }) => {
  console.log(`onAction:: [${action}]`, node)
}

const onNodeToggle = currentNode => {
  console.log('onNodeToggle::', currentNode)
}
// const nodes = [ 
//     {
//         value: 'mars',
//         label: 'Mars',
//         children: [
//             { value: 'phobos', label: 'Phobos' },
//             { value: 'deimos', label: 'Deimos' },
//         ],

//     }
// ];

const parents = [];

for (let i = 0; i < 100; i += 1) {
    const children = [];

    for (let j = 0; j < 200; j += 1) {
        children.push({
            value: `node-0-${i}-${j}`,
            label: `Node 0-${i}-${j}`,
        });
    }

    parents.push({
        value: `node-0-${i}`,
        label: `Node 0-${i}`,
        children,
    });
}

const nodes = [{
    value: 'node-0',
    label: 'Node 0',
    children: parents,
},
];


class Tree extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: ["node-0"],
            expanded: ["node-0"],
            row: "",
        };
    }

    componentDidMount() {
        const { getMovies } = this.props
        getMovies()
    }

    loadMore() {
        const { getMovies, page, totalPages } = this.props
        if (page < totalPages) getMovies(page + 1)
    }
    handleButtonClick(e, row) {
        console.log(row.original);


        this.setState({
            row: row.original
        });


    }


    render() {



        const { tree, totalMovies } = this.props
        console.log(this.state.expanded);
        
        return (
            <div>
<DropdownTreeSelect data={data} onChange={onChange} onAction={onAction} onNodeToggle={onNodeToggle} />

            <CheckboxTree
                nodes={nodes}
                checked={this.state.checked}
                expanded={this.state.expanded}
                onCheck={checked => this.setState({ checked })}
                onExpand={expanded => this.setState({ expanded })}
            />
            </div>
        );
    }
}


const mapStateToProps = state => {
    console.log(state);
    return {
        tree: state.tree.nowPlaying,
        // page: state.movies.page,
        // totalPages: state.movies.totalPages,
        // totalMovies: state.movies.totalMovies
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getMovies: page => dispatch(TreeActions.treeRequest())
    }
}

Tree.defaultProps = {
    getMovies: null,
    totalPages: 0,
    totalMovies: 0,
    page: 0
}

Tree.propTypes = {
    tree: PropTypes.arrayOf(PropTypes.any).isRequired,
    getMovies: PropTypes.func,
    page: PropTypes.number,
    totalPages: PropTypes.number,
    totalMovies: PropTypes.number
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Tree)

