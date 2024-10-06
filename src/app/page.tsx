'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import URL from 'url-parse';
import ExcelExport from 'export-xlsx';

export const SETTINGS_FOR_EXPORT = {
  fileName: 'example',
  workSheets: [
    {
      sheetName: 'example',
      startingRowNumber: 2,
      tableSettings: {
        table1: {
          tableTitle: "Score",
          headerDefinition: [
            {
              name: 'Name',
              key: 'name',
            },
            {
              name: 'Origin URL',
              key: 'url',
            },
            {
              name: 'Product Link',
              key: 'product_link',
            },
            {
              name: 'Shop Id',
              key: 'idx',
            },
            {
              name: 'Product Id',
              key: 'ext',
            },
          ],
        }
      }
    },
  ],
};

type XItem = {
  url: string;
  name: string;
  idx: string;
  ext: string;
  product_link: string;
}

const Home = () => {
  const [list, setList] = useState<XItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const handleURL = () => {
    if (!searchTerm.trim()) return;
    const url = new URL(searchTerm);
    const paths = url.pathname.split(".");

    const newItem = {
      url: url.href,
      name: decodeURIComponent(paths.length > 0? paths[0]: "").replace("/", ""),
      idx: paths.length >= 3? paths[paths.length - 2]: "",
      ext: paths.length >= 3? paths[paths.length - 1]: "",
    } as XItem;

    newItem.product_link = `https://shopee.vn/product/${newItem.idx}/${newItem.ext}`;

    setList(list.concat(newItem));
    setSearchTerm("");
  }

  const handleClear = () => {
    setSearchTerm("");
  }

  const handleExport = () => {
    const data = [
      {
        table1: list
      }
    ];
    
    const excelExport = new ExcelExport();
    excelExport.downloadExcel(SETTINGS_FOR_EXPORT, data);
  }

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full max-w-md flex">
        <Input 
          type="text"
          placeholder="Input a URL..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}/>
        <Button className="ml-2" onClick={handleURL}>Add</Button>
        <Button className="ml-2" onClick={handleClear}>Clear</Button>
        <Button className="ml-2" onClick={handleExport}>Export Excel</Button>
      </div>
      <div className="w-full max-w-4xl mt-8">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Origin URL</th>
              <th className="px-4 py-2 border-b">Parse URL</th>
              <th className="px-4 py-2 border-b">Id Shop</th>
              <th className="px-4 py-2 border-b">ID San Pham</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border-b">
                  <a href={item.url} target="_blank" rel="noreferrer">{item.name}</a>
                </td>
                <td className="px-4 py-2 border-b">
                  <a href={item.product_link} target="_blank" rel="noreferrer">{item.product_link}</a>
                </td>
                 <td className="px-4 py-2 border-b">{item.idx}</td>
                <td className="px-4 py-2 border-b">{item.ext}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;