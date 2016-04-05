PDFS:=DDKWizard_Help.pdf
INTERMEDIATE:=$(foreach f,$(PDFS),$(basename $f).out $(basename $f).toc $(basename $f).log $(basename $f).fls $(basename $f).aux)

all: $(PDFS)

%.pdf: %.tex
	pdflatex -interaction batchmode $^
	pdflatex -interaction batchmode $^
	pdflatex -interaction batchmode $^
	-rm -f $(foreach f,$(basename $@),$f.out $f.toc $f.log $f.fls $f.aux)

clean:
	-rm -f $(PDFS) $(INTERMEDIATE)

rebuild: clean all

.PHONY: all clean rebuild
.NOTPARALLEL: clean rebuild
.INTERMEDIATE: $(INTERMEDIATE)
