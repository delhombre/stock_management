import {
	FormControlLabel,
	makeStyles,
	Switch,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	TableSortLabel,
} from "@material-ui/core";
import React from "react";

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
	const { classes, order, orderBy, onRequestSort, headCells } = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? "right" : "left"}
						padding={headCell.disablePadding ? "none" : "default"}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : "asc"}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<span className={classes.visuallyHidden}>
									{order === "desc" ? "sorted descending" : "sorted ascending"}
								</span>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

// EnhancedTableHead.propTypes = {
// 	classes: PropTypes.object.isRequired,
// 	numSelected: PropTypes.number.isRequired,
// 	onRequestSort: PropTypes.func.isRequired,
// 	onSelectAllClick: PropTypes.func.isRequired,
// 	order: PropTypes.oneOf(["asc", "desc"]).isRequired,
// 	orderBy: PropTypes.string.isRequired,
// 	rowCount: PropTypes.number.isRequired,
// };

const useStyles = makeStyles(() => ({
	root: {
		width: "100%",
	},
	table: {
		minWidth: 750,
	},
	visuallyHidden: {
		border: 0,
		clip: "rect(0 0 0 0)",
		height: 1,
		margin: -1,
		overflow: "hidden",
		padding: 0,
		position: "absolute",
		top: 20,
		width: 1,
	},
}));

const CustomTable = ({ headCells, rows }) => {
	const classes = useStyles();
	const [order, setOrder] = React.useState("asc");
	const [orderBy, setOrderBy] = React.useState("calories");
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleClick = (event, name) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}

		setSelected(newSelected);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleChangeDense = (event) => {
		setDense(event.target.checked);
	};

	const isSelected = (name) => selected.indexOf(name) !== -1;

	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

	return (
		<div className={classes.root}>
			<FormControlLabel
				control={<Switch checked={dense} onChange={handleChangeDense} />}
				label="Réduire les espacements"
			/>
			<TableContainer>
				<Table
					className={classes.table}
					aria-labelledby="tableTitle"
					size={dense ? "small" : "medium"}
					aria-label="enhanced table"
				>
					<EnhancedTableHead
						classes={classes}
						order={order}
						orderBy={orderBy}
						onRequestSort={handleRequestSort}
						headCells={headCells}
					/>
					<TableBody>
						{stableSort(rows, getComparator(order, orderBy))
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row, index) => {
								const isItemSelected = isSelected(row.name);
								const labelId = `enhanced-table-checkbox-${index}`;

								return (
									<TableRow
										hover
										onClick={(event) => handleClick(event, row.name)}
										role="checkbox"
										aria-checked={isItemSelected}
										tabIndex={-1}
										key={row.name}
										selected={isItemSelected}
									>
										{/* <TableCell padding="checkbox">
												<Checkbox
													checked={isItemSelected}
													inputProps={{ "aria-labelledby": labelId }}
												/>
											</TableCell> */}
										<TableCell
											component="th"
											id={labelId}
											scope="row"
											padding="none"
										>
											{row.name}
										</TableCell>
										<TableCell align="right">{row.calories}</TableCell>
										<TableCell align="right">{row.fat}</TableCell>
										<TableCell align="right">{row.carbs}</TableCell>
										<TableCell align="right">{row.protein}</TableCell>
									</TableRow>
								);
							})}
						{emptyRows > 0 && (
							<TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
								<TableCell colSpan={6} />
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</div>
	);
};

export default CustomTable;
