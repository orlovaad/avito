import { Tree } from 'antd';
import type { DataNode } from 'antd/es/tree';
import { commentMap } from '../news_list_item/NewsListItem';

export interface CommentsProps {
  comments: commentMap;
  storyId: number;
}

const commentsTree = (comments: commentMap, postId: number) => {
  const list: DataNode[] = [];
  const kids = comments[postId]?.kids;

  if (!kids) return list;

  for (let i = 0; i < kids.length; i++) {
    const comment = comments[kids[i]];
    const treeNode: DataNode = {
      title: comment.text,
      key: comment.id,
    };
    if (comment.kids) {
      treeNode.children = commentsTree(comments, kids[i]);
    }
    list.push(treeNode);
  }
  return list;
};

function Comments({ comments, storyId }: CommentsProps) {
  const treeData = commentsTree(comments, storyId);
  const commentsBlockHeight = 600;

  return (
    <div>
      Comments:
      <Tree treeData={treeData} height={commentsBlockHeight} defaultExpandAll />
    </div>
  );
}

export default Comments;
