#! /usr/bin/env python3

import sys
import xlsxwriter

comment = sys.argv[1]

new_wb = xlsxwriter.Workbook('./excel_created_by_python.xlsx')
new_ws = new_wb.add_worksheet()

new_ws.write( 0, 0, "This is cell A1!")
new_ws.write( 1, 0, "You said '" + comment + "'.")
new_wb.close()
