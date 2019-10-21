import React from "react";
import ReactDOM from "react-dom";

import {
  ReactiveBase,
  DataSearch,
  ReactiveList,
  ResultCard,
  SelectedFilters,
  SingleRange,
  MultiList
} from "@appbaseio/reactivesearch";

import "./index.css";

const App = () => (
  <ReactiveBase
    app="good-books-ds"
    credentials="nY6NNTZZ6:27b76b9f-18ea-456c-bc5e-3a5263ebc63d"
  >
    <div className="row">
      <div className="col">
        <div className="filter">
          <DataSearch
            title="DataSearch"
            dataField={"original_title"}
            componentId="SearchBox"
            // URLParams
            react={{
              and: ["AuthorFilter", "RatingsFilter", "SearchResult"]
            }}
          />
        </div>
        <div className="filter">
          <MultiList
            componentId="AuthorFilter"
            dataField="authors.raw"
            title="Authors"
            size={100}
            placeholder="Filter by author name"
            filterLabel="Authors"
            react={{
              and: ["SearchBox", "RatingsFilter", "SearchResult"]
            }}
          />
        </div>
        <div className="filter">
          <SingleRange
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
      </div>

      <div className="col">
        <SelectedFilters />
        <ReactiveList
          componentId="SearchResult"
          dataField="original_title"
          size={10}
          className="result-list-container"
          // pagination
          react={{
            and: ["SearchBox", "RatingsFilter", "AuthorFilter"]
          }}
          render={({ data }) => (
            <ReactiveList.ResultCardsWrapper>
              {data.map(item => (
                <ResultCard key={item.id}>
                  <ResultCard.Image src={item.image} />
                  <ResultCard.Title>
                    <div
                      className="book-title"
                      dangerouslySetInnerHTML={{
                        __html: item.original_title
                      }}
                    />
                  </ResultCard.Title>

                  <ResultCard.Description>
                    <div className="flex column justify-space-between">
                      <div>
                        <div>
                          by{" "}
                          <span className="authors-list">{item.authors}</span>
                        </div>
                        <div className="ratings-list flex align-center">
                          <span className="stars">
                            {Array(item.average_rating_rounded)
                              .fill("x")
                              .map((item, index) => (
                                <i className="fas fa-star" key={index} />
                              )) // eslint-disable-line
                            }
                          </span>
                          <span className="avg-rating">
                            ({item.average_rating} avg)
                          </span>
                        </div>
                      </div>
                      <span className="pub-year">
                        Pub {item.original_publication_year}
                      </span>
                    </div>
                  </ResultCard.Description>
                </ResultCard>
              ))}
            </ReactiveList.ResultCardsWrapper>
          )}
        />
      </div>
    </div>
  </ReactiveBase>
);

export default App;

ReactDOM.render(<App />, document.getElementById("root"));
