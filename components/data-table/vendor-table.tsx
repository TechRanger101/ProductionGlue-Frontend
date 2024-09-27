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
import { useVendorTablePageStore } from "@/store/vendorTablePage";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  // currentPage: number;
  // setCurrentPage: (page: number) => void;
  pageSize: number;
  setPerPage: (page: number) => void;
  getVendors: () => void;
  totalItemsCount: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageSize,
  setPerPage,
  getVendors,
  totalItemsCount,
}: 
DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [filtering, setFiltering] = useState("");
  const { setVendorTablePage,vendorTablePage } = useVendorTablePageStore();
//   console.log("totalItemsCount ", totalItemsCount,' ',data?.length);

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
      <div
      className="w-full overflow-x-auto"
      >
        <div className="flex items-center my-3 space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
              setPerPage(Number(value));
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
        <Pagination className="pt-1 max-md:my-4 max-md:py-2  max-md:w-fit">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
               //  href="#"
                onClick={() => {
                  pageNumber.current = table.getState().pagination.pageIndex;
                  table.previousPage();
                  setVendorTablePage(pageNumber.current);
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
                  const currentPageIndex = vendorTablePage>=0? vendorTablePage:  table.getState().pagination.pageIndex;
                  const isFirstPage = page === 0;
                  const isLastPage = page === table.getPageCount() - 1;
                  const isCurrentPage = page === table.getState().pagination.pageIndex;
                  console.log(table.getState().pagination.pageIndex, " currentPageIndex ", currentPageIndex ,"  pageNumber.current ", pageNumber.current);
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
                              setVendorTablePage(pageNumber.current);
                            }}
                            isActive={!isCurrentPage}
                            className={!isCurrentPage ? "" : "bg-[#D7E9FF]"}
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
                              setVendorTablePage(pageNumber.current);
                            }}
                            isActive={!isCurrentPage}
                            className={!isCurrentPage ? "" : "bg-[#D7E9FF]"}
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
                  setVendorTablePage(pageNumber.current);
                }}
                className={
                  !table.getCanNextPage()
                    ? "opacity-50 pointer-events-none cursor-not-allowed"
                    : ""
                }
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
               //  href="#"
                onClick={() => {
                    getVendors();
                }}
                className={
                  totalItemsCount > data?.length
                    ? "bg-[#D7E9FF] w-20 ml-2"
                    : "opacity-50 pointer-events-none cursor-not-allowed"
                }
              >
                Load
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}
