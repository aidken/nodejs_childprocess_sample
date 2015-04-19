#! /usr/bin/env python3

import sys

try:
    infile = sys.argv[1]
except IndexError:
    sys.exit("Please specify file.")

with open(infile) as fh:
    for line in fh:
        print('This is from python: ' + line)
