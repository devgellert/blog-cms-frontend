import React, { useState } from "react";
import { FC, memo, useEffect } from "react";
import { isFunction } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
//
import GridConfig from "./types/GridConfig";
import GridSelectors from "../../../redux/grid/selector";
import { gridActions } from "../../../redux/grid/slice";
import ActionsMenu from "./components/ActionsMenu/ActionsMenu";
//
import css from "./Grid.module.scss";

type Props = {
    config: GridConfig<any, any>;
};

const Grid: FC<Props> = ({ config: { columns, transformer, apiEndpoint, actions } }) => {
    const dispatch = useDispatch();

    const rows = useSelector(GridSelectors.getRows);
    const pagination = useSelector(GridSelectors.getPagination);
    const isLoading = useSelector(GridSelectors.isLoading);

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        dispatch(gridActions.fetchRows({ transformer, apiEndpoint, setPaginationToInitial: !isMounted }));

        if (!isMounted) {
            setIsMounted(true);
        }
    }, [pagination.page, pagination.limit]);

    const handleChangePage = (event: unknown, newPage: number) => {
        dispatch(gridActions.setPaginationPage(newPage));
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(gridActions.setPaginationLimit(+event.target.value));
        dispatch(gridActions.setPaginationPage(0));
    };

    if (isLoading) {
        return (
            <div className={css["loader-wrap"]}>
                <CircularProgress color="success" />
            </div>
        );
    }

    return (
        <Paper sx={{ width: "100%", overflow: "hidden" }} className={css["Grid"]}>
            <TableContainer className={css["table-container"]}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map(column => (
                                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                    {column.label}
                                </TableCell>
                            ))}
                            {actions && <TableCell key="actions" />}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => {
                            return (
                                <TableRow key={row.id} hover role="checkbox" tabIndex={-1}>
                                    {columns.map(column => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {isFunction(column.format) ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}

                                    {actions && (
                                        <TableCell>
                                            <ActionsMenu
                                                actions={actions.map(action => ({
                                                    text: action.text,
                                                    onClick: (() => {
                                                        if (isFunction(action.onClick)) {
                                                            // @ts-ignore
                                                            return () => action.onClick(row);
                                                        }
                                                        return undefined;
                                                    })(),
                                                    link: (() => {
                                                        if (isFunction(action.createLink)) {
                                                            // @ts-ignore
                                                            return action.createLink(row);
                                                        }
                                                        return undefined;
                                                    })()
                                                }))}
                                            />
                                        </TableCell>
                                    )}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25]}
                component="div"
                count={pagination?.max || 0}
                rowsPerPage={pagination.limit}
                page={pagination.page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default memo(Grid);
