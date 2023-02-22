import { Tree } from 'antd';
import type { DataNode } from 'antd/es/tree';
import { commentMap } from '../news_list_item/NewsListItem';

export interface CommentsProps {
  comments: commentMap;
  storyId: number;
}

const dig = (comments: commentMap, postId: number) => {
  const list: DataNode[] = [];
  console.log(postId);
  const kids = comments[postId]?.kids;
  console.log(kids);
  if (!kids) return list;

  for (let i = 0; i < kids.length; i++) {
    const comment = comments[kids[i]];
    const treeNode: DataNode = {
      title: comment.text,
      key: comment.id,
    };
    if (comment.kids) {
      treeNode.children = dig(comments, kids[i]);
    }
    list.push(treeNode);
  }
  return list;
};

function Comments({ comments, storyId }: CommentsProps) {
  console.log(comments);
  const treeData = dig(comments, storyId);

  return (
    <div>
      Comments:
      <Tree treeData={treeData} height={600} defaultExpandAll />
    </div>
  );
}

export default Comments;
