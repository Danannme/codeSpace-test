import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

// react router
import { useRouteLoaderData } from "react-router";

// types
import type { LoaderData } from "@/types/types";

// icons
import { Plus, Minus } from "lucide-react";

export default function StickyHeaderTable() {
    const data = useRouteLoaderData("root") as LoaderData;

    return (
        <div className="grid w-full [&>div]:max-h-[300px] [&>div]:rounded">
            <Table className="border-separate border-spacing-y-5">
                <TableHeader className="hidden md:table-header-group">
                    <TableRow className="[&>*]:whitespace-nowrap sticky top-0 bg-white hover:bg-white after:content-[''] after:inset-x-0 after:h-px  after:absolute after:bottom-0 z-10 border-none">
                        <TableHead></TableHead>
                        <TableHead className="">Product</TableHead>
                        <TableHead className="pl-7 hidden md:table-cell">
                            QTY
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                            Price
                        </TableHead>
                        <TableHead className="hidden md:table-cell"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="overflow-hidden">
                    {data.products.products.map((product) => (
                        <TableRow
                            key={product.id}
                            className="border-none bg-[#F5F5F5] "
                        >
                            {/* checkbox col */}
                            <TableCell className=" flex justify-center items-center p-0 h-[116px]">
                                <Checkbox className="data-[state=checked]:bg-[#007AFF] data-[state=checked]:border-none" />
                            </TableCell>

                            {/* product name col */}
                            <TableCell className="">
                                <img src={product.thumbnail} className="w-25" />
                            </TableCell>

                            {/* quantity col */}
                            <TableCell className="hidden md:flex gap-2">
                                <Minus size={15} className="cursor-pointer" />
                                {product.stock}
                                <Plus size={15} className="cursor-pointer" />
                            </TableCell>

                            {/* price col */}
                            <TableCell className="hidden md:table-cell">
                                {(
                                    product.price -
                                    (product.price *
                                        product.discountPercentage) /
                                        100
                                ).toFixed(2)}
                            </TableCell>

                            {/* quick action col */}
                            <TableCell className="hidden md:table-cell"></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
