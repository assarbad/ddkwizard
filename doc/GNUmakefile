PDFS:=DDKWizard_Help.pdf
INTERMEDIATE:=$(foreach f,$(PDFS),$(basename $f).out $(basename $f).toc $(basename $f).log $(basename $f).fls $(basename $f).aux)
PDFLATEX:=pdflatex -no-shell-escape -interaction batchmode
#PDFLATEX:=pdflatex -no-shell-escape

all: $(PDFS)

%.pdf: %.tex
	$(PDFLATEX) $^
	$(PDFLATEX) $^
	$(PDFLATEX) $^
	-rm -f $(foreach f,$(basename $@),$f.toc $f.fls $f.aux)

clean:
	-rm -f $(PDFS) $(INTERMEDIATE)

rebuild: clean all

.PHONY: all clean rebuild
.NOTPARALLEL: clean rebuild
.INTERMEDIATE: $(INTERMEDIATE)
