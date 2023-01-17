import _ from 'lodash';
import React, {
  useEffect,
  useState,
} from 'react';
import {
  connect,
} from 'react-redux';

import {
  Button,
  Box,
  CircularProgress,
  Typography,
} from '@material-ui/core';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
} from '@material-ui/core';

import {
  makeStyles,
} from '@material-ui/core/styles';

import {
  readProjects,
} from '../../actions/projects';
import {
  formatDate,
} from '../../lib/utils';

const useStyles = makeStyles((theme) => ({
  projectsBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '& > *': {
      margin: '10px', // spacing between childs of 10px
    },
  },
  readError: {
    color: '#ff0000',
  },
}));

const headCells = [
  { id: 'timestamp', label: 'Timestamp'},
  { id: 'id',        label: 'ID'},
  { id: 'oldValue',  label: 'Old Value'},
  { id: 'newValue',  label: 'New Value'},
];

const Projects = props => {
  const {dispatch, projects} = props;
  const classes = useStyles();

  const [order,      setOrder]      = useState('desc');
  const [orderBy,    setOrderBy]    = useState('timestamp');
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    dispatch(readProjects());
  });

  useEffect(() => {
    const newData = _.map(projects.data, item => ({
      timestamp: item.timestamp,
      id:        item.id,
      oldValue:  _.get(item, ['diff', 0, 'oldValue']),
      newValue:  _.get(item, ['diff', 0, 'newValue']),
    }));
    setDataSource(_.orderBy(newData, ['timestamp'], ['desc']));
  }, [projects.data]);

  const fetchData = () => {
    dispatch(readProjects({refresh: true}));
  };

  const handleSort = (property) => {
    console.log(`handleSort`, property);
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    setDataSource(_.orderBy(dataSource, [property], [isAsc ? 'desc' : 'asc']));
  };

  const renderData = () => {
    if(dataSource && dataSource.length) {
      return (
        <Paper className='data-table'>
          <Table>
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell key={headCell.id}>
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={() => handleSort(headCell.id)}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataSource.map((row) => (
                <TableRow key={row.id}>
                <TableCell>{formatDate(row.timestamp, 'YYYY-MM-DD')}</TableCell>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.oldValue}</TableCell>
                  <TableCell>{row.newValue}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      );
    };
  };

  const renderError = () => {
    if(projects.readError) {
      return <Typography className={classes.readError}>{projects.readError.error}</Typography>
    }
  }

  const renderActions = () => {
    if(projects.reading) {
      return <CircularProgress />
    }

    return (
      <Button
        variant="contained"
        color="primary"
        onClick={fetchData}>
        {projects.readError ? 'Retry' : 'Load more'}
      </Button>
    );
  }

  return (
    <Box className={classes.projectsBox} data-testid="projects-box" m={2}>
      {renderData()}
      {renderError()}
      {renderActions()}
    </Box>
  );
};

const mapStateToProps = state => {
  const {
    projects,
  } = state;

  return {
    projects,
  };
};

export default connect(mapStateToProps)(Projects);
