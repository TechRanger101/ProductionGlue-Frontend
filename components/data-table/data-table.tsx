"use client";

import { Fragment, useRef, useState } from "react";

import {
  ColumnDef,
  flexRender,
  SortingState,
  VisibilityState,
  ColumnFiltersState,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data,
    columns,
    onGlobalFilterChange: setFiltering,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    paginateExpandedRows: true,
  });
  const pageNumber = useRef(table.getState().pagination.pageIndex);

  return (
    <>
      {/* Filters */}

      <div className="flex items-center justify-between">
        <div className="flex items-center py-4">
          <Input
            placeholder="Search"
            // value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            // onChange={(event) =>
            //   table.getColumn("name")?.setFilterValue(event.target.value)
            // }
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
            className="max-w-md 2xl:w-96 2xl:text-lg lg:w-80 bg-transparent"
          />
        </div>

        {/* Column visibility */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto 2xl:text-lg">
              View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize 2xl:text-lg"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="2xl:text-xl">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="2xl:text-lg">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {/* <div className="flex items-center justify-end space-x-2 py-4"> */}
      <div>
        <div className="flex items-center mt-3 space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-9 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50, 100].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Pagination className="pt-1">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
               //  href="#"
                onClick={() => {
                  pageNumber.current = table.getState().pagination.pageIndex;
                  table.previousPage();
                }}
                className={
                  !table.getCanPreviousPage()
                    ? "opacity-50 pointer-events-none cursor-not-allowed"
                    : ""
                }
              />
            </PaginationItem>
            <div className="flex items-center gap-x-1">
              {Array.from({ length: table.getPageCount() }, (_, i) => i).map(
                (page) => {
                  const currentPageIndex =
                    table.getState().pagination.pageIndex;
                  const isFirstPage = page === 0;
                  const isLastPage = page === table.getPageCount() - 1;
                  const isCurrentPage = page === currentPageIndex;
                  const showPage =
                    isCurrentPage ||
                    isFirstPage ||
                    isLastPage ||
                    Math.abs(page - currentPageIndex) <= 2;

                  if (!showPage) {
                    return null;
                  }

                  return (
                    <Fragment key={page}>
                      {!isLastPage && (
                        <PaginationItem key={page}>
                          <PaginationLink
                           //  href="#"
                            key={page}
                            onClick={() => {
                              table.setPageIndex(page);
                              pageNumber.current = page;
                            }}
                            isActive={!isCurrentPage}
                            className=""
                          >
                            {page + 1}
                          </PaginationLink>
                        </PaginationItem>
                      )}
                      {isFirstPage && currentPageIndex > 3 ? (
                        <PaginationEllipsis />
                      ) : (
                        ""
                      )}

                      {isLastPage && currentPageIndex < table.getPageCount() - 4
                        ? " ...  "
                        : ""}

                      {isLastPage && (
                        <PaginationItem key={page}>
                          <PaginationLink
                           //  href="#"
                            key={page}
                            onClick={() => {
                              table.setPageIndex(page);
                              pageNumber.current = page;
                            }}
                            isActive={!isCurrentPage}
                            className=""
                          >
                            {page + 1}
                          </PaginationLink>
                        </PaginationItem>
                      )}
                    </Fragment>
                  );
                }
              )}
            </div>

            <PaginationItem>
              <PaginationNext
               //  href="#"
                onClick={() => {
                  if (!table.getCanNextPage()) return;
                  table.nextPage();
                  pageNumber.current = table.getState().pagination.pageIndex;
                }}
                className={
                  !table.getCanNextPage()
                    ? "opacity-50 pointer-events-none cursor-not-allowed"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}
