import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ReactTable from 'react-table'
import matchSorter from 'match-sorter'
import MoviesActions from '../Redux/MoviesRedux'
import 'react-table/react-table.css'

import PopupDetails from '../Containers/popup'

import { Redirect } from 'react-router-dom';


class MoviesGrid extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      row: "",
    }
  }

  //   //routing
  //   if (this.state.redirectToReferrer) {
  //     return (<Redirect to={'/ApplyLeave'} />)
  // }

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


console.log('test');
console.log(this.props);
    const { movies, totalMovies } = this.props
    const columns = [
      // {
      //   Header: 'Name',
      //   accessor: 'Name',
      //   filterable: false,
      //   sortable: false
      // },

      // {
      //   Header: 'Title',
      //   columns: [
      //     {
      //       Header: 'Original',
      //       accessor: 'original_title',
      //       filterMethod: (filter, row) => row[filter.id].startsWith(filter.value),
      //       Footer: (
      //         <span>
      //           <strong>Shown Movies:</strong> {movies.length} | {totalMovies}
      //         </span>
      //       )
      //     },
      //     {
      //       Header: 'Actual',
      //       accessor: 'title',
      //       filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['title'] }),
      //       filterAll: true,
      //       Footer: (
      //         <button type="button" onClick={this.loadMore.bind(this)}>
      //           load more..
      //         </button>
      //       )
      //     }
      //   ]
      // },
      // {
      //   Header: 'Release Date',
      //   accessor: 'release_date'
      // },
      {
        Header: 'ID',
        accessor: 'id',
        style: { whiteSpace: 'unset', fontSize: '12px', lineHeight: 1.4 }
      },
      {
        Header: 'Component Id',
        accessor: 'ComponentId',
        style: { whiteSpace: 'unset', fontSize: '12px', lineHeight: 1.4 }
      },
      {
        Header: 'Title',
        accessor: 'Title',
        style: { whiteSpace: 'unset', fontSize: '12px', lineHeight: 1.4 }
      },
      {
        Header: 'Component Name',
        accessor: 'ComponentName',
        style: { whiteSpace: 'unset', fontSize: '12px', lineHeight: 1.4 }
      },
      {
        Header: 'Component Code',
        accessor: 'ComponentCode',
        style: { whiteSpace: 'unset', fontSize: '12px', lineHeight: 1.4 }
      },
      {
        Header: 'Component Type',
        accessor: 'ComponentType',
        style: { whiteSpace: 'unset', fontSize: '12px', lineHeight: 1.4 }
      },
      {
        Header: 'ComponentCounterName',
        accessor: 'ComponentCounterName',
        style: { whiteSpace: 'unset', fontSize: '12px', lineHeight: 1.4 }
      },
      // {
      //   Header: 'Status Name',
      //   accessor: 'StatusName',
      //   style: { whiteSpace: 'unset', fontSize: '12px', lineHeight: 1.4 },
      //   Cell: row => (
      //     <span>
      //       <span style={{
      //         color: row.value === 'Closed' ? '#ff2e00'
      //           : row.value === 'Open' ? '#57d500'
      //             : '#ffbf00',
      //         transition: 'all .3s ease',
      //         fontSize: '14px'
      //       }}>
      //         &#x25cf;
      //       </span>
      //       {row.value}

      //       {/* <button onClick={(e) => this.handleButtonClick(e, row)}>Edit</button> */}
      //     </span>
      //   )
      // }
    ]

    return (

      <div>
        <header className="App-header">
          <h3 className="App-title">Task list</h3>
        </header>
        <ReactTable
          // defaultFilterMethod={(filter, row) => String(row[filter.id]).startsWith(filter.value)}
          columns={columns}
          data={movies}
          defaultPageSize={20}
          filterable
          style={{
            height: '600px' // This will force the table body to overflow and scroll, since there is not enough room
          }}
          showPaginationBottom
          multiSort
          className="-striped -highlight"
          SubComponent={row => {
            console.log(row);
            var columnNames = Object.keys(row.original);
            return (
              <div style={{ padding: "20px" }}>

                {/* {row.original.RefNo}  */}
                <ul>
                  {columnNames.map(function (name) {
                    return <li><span className="label">{name}</span> {row.original[name]}</li>;
                  })}
                </ul>
              </div>
            );
          }}
        />


        <PopupDetails popupdata={this.state.row}>
        </PopupDetails>
      </div>

    )
  }
}

const mapStateToProps = state => {
  console.log('balu');
  console.log(state.movies.nowPlaying);
  return {
    movies: state.movies.nowPlaying,
    // page: state.movies.page,
    // totalPages: state.movies.totalPages,
    // totalMovies: state.movies.totalMovies
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMovies: page => dispatch(MoviesActions.moviesRequest())
  }
}

MoviesGrid.defaultProps = {
  getMovies: null,
  totalPages: 0,
  totalMovies: 0,
  page: 0
}

MoviesGrid.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.any).isRequired,
  getMovies: PropTypes.func,
  page: PropTypes.number,
  totalPages: PropTypes.number,
  totalMovies: PropTypes.number
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviesGrid)
