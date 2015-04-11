#! /usr/bin/env python3

import sys

print('Hello from python!')

infile = sys.argv[1]

with open(infile) as fh:
    for line in fh:
        print('This is from python: ' + line)
