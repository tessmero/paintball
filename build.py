
# build production.js
# by combining all the script tags in test.html

with open('production.js','w') as fout:
    with open('test.html','r') as fhtml:
        while True:
            line = fhtml.readline()
            if not line:
                break
            if ("<script" in line) and ("</script>" in line) and ("bootstrap.min.js" not in line):
                i = line.index('"')
                j = line.rindex('"')
                filepath = line[i+1:j]
                
                print(filepath)
                with open(filepath,'r') as fin:
                    fout.write('\n')
                    fout.write(fin.read())
                    fout.write('\n')