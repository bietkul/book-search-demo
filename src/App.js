import React from "react";
import ReactDOM from "react-dom";

import {
  ReactiveBase,
  DataSearch,
  ReactiveList,
  SelectedFilters,
  SingleRange,
  MultiList,
  ResultList
} from "@appbaseio/reactivesearch";

import "./index.css";

const App = () => (
  <ReactiveBase
    app="good-books-ds"
    credentials="nY6NNTZZ6:27b76b9f-18ea-456c-bc5e-3a5263ebc63d"
  >
    <div className="row">
      <div className="col">
        <DataSearch
          className="filter"
          title="DataSearch"
          componentId="SearchBox"
          dataField="original_title"
          URLParams
          react={{
            and: ["AuthorFilter", "RatingsFilter"]
          }}
        />
        <MultiList
            className="filter"
            componentId="AuthorFilter"
            dataField="authors.raw"
            title="Authors"
            size={100}
            placeholder="Filter by author name"
            filterLabel="Authors"
            react={{
              and: ["SearchBox", "RatingsFilter"]
            }}
          />
        <SingleRange
          className="filter"
          componentId="RatingsFilter"
          dataField="average_rating_rounded"
          title="Book Ratings"
          data={[
            {
              start: 4,
              end: 5,
              label: "★★★★ & up"
            },
            {
              start: 3,
              end: 5,
              label: "★★★ & up"
            },
            {
              start: 2,
              end: 5,
              label: "★★ & up"
            },
            {
              start: 1,
              end: 5,
              label: "★ & up"
            }
          ]}
          filterLabel="Ratings"
        />
      </div>
      <div className="col">
        <SelectedFilters />
        <ReactiveList
          componentId="SearchResult"
          dataField="original_title"
          size={10}
          className="result-list-container"
          react={{
            and: ["SearchBox", "RatingsFilter", "AuthorFilter"]
          }}
          renderItem={item => (
            <ResultList key={item._id}>
              <ResultList.Image src={item.image} />
              <ResultList.Content>
                <ResultList.Title>
                  {item.original_title}
                </ResultList.Title>
                <ResultList.Description>
                  <div>by {item.authors}</div>
                  <div>({item.average_rating} avg)</div>
                  <span>Pub {item.original_publication_year}</span>
                </ResultList.Description>
              </ResultList.Content>
            </ResultList>
          )}
        />
      </div>
    </div>
  </ReactiveBase>
);

export default App;

ReactDOM.render(<App />, document.getElementById("root"));
