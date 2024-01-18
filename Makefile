.PHONY: deps serve build

serve:
	bundle exec jekyll serve --livereload

deps:
	bundle install

build:
	bundle exec jekyll build
