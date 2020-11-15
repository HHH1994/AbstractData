// 树节点类
function TreeNode(value) {
    this.left = null;
    this.right = null;
    this.value = value;
}

// 插入节点
function insertNode(curNode, value) {
    if (!curNode.left && curNode.value > value) {
        curNode.left = new TreeNode(value);
    } else if (!curNode.right && curNode.value < value) {
        curNode.right = new TreeNode(value);
    }

    if (curNode.left && curNode.value > value) {
        insertNode(curNode.left, value);
    } else if (curNode.right && curNode.value < value) {
        insertNode(curNode.right, value);
    }
}

// 查找左侧子节点树中最大节点
function findLeftMaxChildNode(leftNode) {
    while(leftNode && leftNode.right) {
        leftNode = leftNode.right;
    }
    return leftNode;
}

// 移除节点
function removeNode(curNode, value) {
    // 如果传入的节点为null 返回
    if (!curNode) return null;

    if (curNode.value > value) {
        curNode.left = removeNode(curNode.left, value);
        return curNode;
    } else if (curNode.value < value) {
        curNode.right = removeNode(curNode.right, value);
        return curNode
    } else {
        // 移除末叶节点,直接移除
        if (!curNode.right && !curNode.left) return null;
    
        // 移除节点如果只存在一个子节点，直接子节点代替移除节点
        if (curNode.left && !curNode.right) {
            return curNode.left
        };

        if (curNode.right && !curNode.left) {
            return curNode.right;
        }
    
        // 移除节点如果存在两个子节点，寻找左侧子节点中最右侧叶子节点
        let auxNode = findLeftMaxChildNode(curNode.left);
        curNode.value = auxNode.value;
        curNode.left = removeNode(curNode.left, auxNode.value);
        return curNode;
    }


}

// 二叉树类
function BinaryTree() {
    this.root = null;

    // 新增树节点
    this.push = function (value) {
        if (!this.root) this.root = new TreeNode(value);
        insertNode(this.root, value);
    };

    // 遍历树节点
    this.traverse = function (value) {
        let curNode = this.root;
        while (curNode) {
            if (curNode.value === value) return curNode;
            if (curNode.value > value) {
                curNode = curNode.left;
            } else if (curNode.value < value) {
                curNode = curNode.right;
            }
        }
        return null;
    };

    // 移除树节点
    this.remove = function (value) {
        // 删除节点需要重新构建一次二叉树
        // 通过不等式分析，删除的节点如果左右子节点都存在，那么用左侧最大子节点和右侧最小子节点代替被删除节点都是可以的
        this.root = removeNode(this.root, value);

    };
}

let tree = new BinaryTree();