import React from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../actions";
import UserHeader from './UserHeader';

class PostList extends React.Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderList() {
    return this.props.posts.map(p => {
      return (
        <div className="item" key={p.id}>
          <i className="large middle aligned icon user" />
          <div className="content">
            <div className="description">
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          </div>
          <UserHeader userId={p}/>
        </div>
      );
    });
  }
  render() {
    return <div className="ui relaxed divided list">{this.renderList()}</div>;
  }
}

const mapStateToProps = state => {
  return { posts: state.posts };
};

export default connect(
  mapStateToProps,
  { fetchPosts }
)(PostList, { fetchPosts });
