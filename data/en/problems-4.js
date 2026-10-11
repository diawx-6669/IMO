window.IMO_L10N = window.IMO_L10N || {};
window.IMO_L10N.en = window.IMO_L10N.en || { problems: {}, tech: {} };
Object.assign(window.IMO_L10N.en.problems, {

"2011-1": { title:"Pairs dividing the sum of a quadruple",
  statement: String.raw`Given a set $A=\{a_{1},a_{2},a_{3},a_{4}\}$ of four distinct positive integers, denote by $s_{A}$ the sum $a_{1}+a_{2}+a_{3}+a_{4}$. Let $n_{A}$ be the number of pairs $(i,j)$ with $1\le i<j\le 4$ for which $a_{i}+a_{j}$ divides $s_{A}$. Find all sets $A$ of four distinct positive integers which achieve the largest possible value of $n_{A}$.`,
  answer: String.raw`The maximum is $n_{A}=4$, attained exactly by $\{d,5d,7d,11d\}$ and $\{d,11d,19d,29d\}$ for an arbitrary positive integer $d$.`,
  hints:[ String.raw`Assume $a_{1}<a_{2}<a_{3}<a_{4}$. Which sums $a_{i}+a_{j}$ are certainly larger than $\frac{s_{A}}{2}$?`,
          String.raw`If $a_{i}+a_{j}>\frac{s_{A}}{2}$ and $a_{i}+a_{j}<s_{A}$, that sum cannot divide $s_{A}$. Check this for the pairs $(3,4)$ and $(2,4)$.`,
          String.raw`So $n_{A}\le4$. It remains to analyse the case where all four sums $a_{1}+a_{2},a_{1}+a_{3},a_{1}+a_{4},a_{2}+a_{3}$ divide $s_A$.`],
  solution: String.raw`Let $a_{1}<a_{2}<a_{3}<a_{4}$ and $s=s_{A}$.

*Step 1: $n_{A}\le 4$.* A sum $a_{i}+a_{j}$ dividing $s$ and strictly less than $s$ must satisfy $a_{i}+a_{j}\le\frac s2$. But
$$a_{3}+a_{4}>a_{1}+a_{2}\ \Longrightarrow\ 2(a_{3}+a_{4})>s\ \Longrightarrow\ a_{3}+a_{4}>\frac s2,$$
$$a_{2}+a_{4}>a_{1}+a_{3}\ \Longrightarrow\ 2(a_{2}+a_{4})>s\ \Longrightarrow\ a_{2}+a_{4}>\frac s2 .$$
So the pairs $(3,4)$ and $(2,4)$ never work, and $n_{A}\le 6-2=4$.

*Step 2: examples with $n_{A}=4$.*
$A=\{1,5,7,11\}$: $s=24$ and $1+5=6\mid24$, $1+7=8\mid24$, $1+11=12\mid24$, $5+7=12\mid24$ (while $5+11=16$ and $7+11=18$ do not divide $24$). So $n_{A}=4$.
$A=\{1,11,19,29\}$: $s=60$ and $1+11=12\mid 60$, $1+19=20\mid60$, $1+29=30\mid60$, $11+19=30\mid60$. So $n_{A}=4$.
Scaling all elements by $d$ preserves every divisibility, so $\{d,5d,7d,11d\}$ and $\{d,11d,19d,29d\}$ work.

*Step 3: classification (outline).* Suppose $n_{A}=4$, so $s$ is divisible by
$$a_{1}+a_{2},\quad a_{1}+a_{3},\quad a_{1}+a_{4},\quad a_{2}+a_{3}.$$
Careful size estimates force $a_{1}+a_{4}=\frac s2$, and $a_{2}+a_{3}\in\{\frac s2,\frac s3\}$. Analysing these two cases (after normalising $\gcd=1$) leads exactly to the two solutions $\{1,5,7,11\}$ and $\{1,11,19,29\}$.

Answer: the maximum is $4$, attained on $\{d,5d,7d,11d\}$ and $\{d,11d,19d,29d\}$.`,
  tags:["divisibility","size estimates","classification"] },

"2011-3": { title:"A functional inequality",
  statement: String.raw`Let $f:\mathbb{R}\to\mathbb{R}$ be a function satisfying
$$f(x+y)\ \le\ y\,f(x)+f\left(f(x)\right)$$
for all real numbers $x,y$. Prove that $f(x)=0$ for all $x\le 0$.`,
  hints:[ String.raw`Rewrite the condition as $f(t)\le (t-x)f(x)+f(f(x))$ for all $x,t$ (substitute $y=t-x$).`,
          String.raw`Apply it twice — with $t=f(a),\,x=b$ and with $t=f(b),\,x=a$ — and add.`,
          String.raw`You obtain $af(a)+bf(b)\le 2f(a)f(b)$. Now substitute $b=2f(a)$.`],
  solution: String.raw`*Step 0.* Substituting $y=t-x$ rewrites the condition as
$$f(t)\ \le\ (t-x)f(x)+f\left(f(x)\right)\qquad\text{for all } x,t\in\mathbb{R}. \tag{*}$$

*Step 1: the key inequality.* Apply (*) with $t=f(a),\ x=b$ and with $t=f(b),\ x=a$:
$$f(f(a))\le \left(f(a)-b\right)f(b)+f(f(b)),\qquad f(f(b))\le\left(f(b)-a\right)f(a)+f(f(a)).$$
Adding and cancelling $f(f(a))+f(f(b))$,
$$0\le \left(f(a)-b\right)f(b)+\left(f(b)-a\right)f(a)=2f(a)f(b)-b\,f(b)-a\,f(a),$$
that is
$$a\,f(a)+b\,f(b)\ \le\ 2f(a)f(b)\qquad\text{for all } a,b. \tag{**}$$

*Step 2: $a\,f(a)\le 0$ for every $a$.* Substitute $b=2f(a)$ into (**):
$$a\,f(a)+2f(a)\,f\left(2f(a)\right)\le 2f(a)\,f\left(2f(a)\right)\ \Longrightarrow\ a\,f(a)\le 0 . \tag{1}$$
In particular $f(a)\ge 0$ for $a<0$.

*Step 3: $f(a)\le 0$ for $a<0$.* Suppose $f(x_{0})>0$ for some $x_{0}<0$. Then (*) with $x=x_{0}$ gives
$$f(t)\le \left(t-x_{0}\right)f(x_{0})+f\left(f(x_{0})\right)\xrightarrow[t\to-\infty]{}-\infty ,$$
so $f(t)<0$ for sufficiently negative $t$. But for such $t<0$, (1) gives $f(t)\ge 0$ — a contradiction. Hence $f(x)\le 0$ for all $x<0$, and together with Step 2,
$$f(x)=0\qquad\text{for all } x<0 . \tag{2}$$

*Step 4: $f(0)=0$.* Take any $x<0$; by (2) $f(x)=0$, so (*) gives
$$f(t)\le (t-x)\cdot 0+f(f(x))=f(0)\qquad\text{for all } t,$$
so $f(0)=\max_{t}f(t)\ge f(t)=0$ for $t<0$, hence $f(0)\ge 0$.

Suppose $f(0)>0$. Apply (*) with $x=0$:
$$f(t)\le t\,f(0)+f\left(f(0)\right)\xrightarrow[t\to-\infty]{}-\infty,$$
so $f(t)<0$ for very negative $t$, contradicting (2). Hence $f(0)\le 0$, and finally $f(0)=0$.

By (2) and Step 4, $f(x)=0$ for all $x\le 0$. $\blacksquare$`,
  tags:["functional inequalities","symmetrisation","limiting estimates"] },

"2011-4": { title:"Weights on a balance",
  statement: String.raw`Let $n>0$ be an integer. We are given a balance and $n$ weights of weight $2^{0},2^{1},\dots,2^{n-1}$. We place each of the $n$ weights on the balance, one after another, in such a way that the right pan is never heavier than the left pan. At each step we choose one of the weights not yet on the balance and put it on either the left or the right pan, until all weights are placed. Determine the number of ways in which this can be done.`,
  answer: String.raw`$1\cdot 3\cdot 5\cdots(2n-1)=(2n-1)!!$`,
  hints:[ String.raw`Look at the lightest weight $2^{0}=1$: it is the only odd one.`,
          String.raw`If the weight $1$ is not placed first, the total already on the balance is even and the left pan is heavier by at least $2$ — so the weight $1$ may go on either pan.`,
          String.raw`Derive the recursion $f(n)=(2n-1)f(n-1)$: the weight $1$ can be inserted at any of the $n$ moments, with a free choice of pan except at the first.`],
  solution: String.raw`Let $f(n)$ be the required number.

*Recursion.* Consider the weight of mass $1$ — the only odd one; all other masses are even. Remove it from the process: the remaining weights have masses $2,4,\dots,2^{n-1}$, and dividing all masses by $2$ gives exactly the original problem for $n-1$ weights. So the "skeleton" of the order and the pan choices for the other weights can be chosen in $f(n-1)$ ways (the condition "right never heavier than left" is unchanged by halving all masses).

Now insert the weight $1$ into the sequence of $n-1$ steps — there are $n$ possible moments.
- If the weight $1$ goes first, the balance is empty beforehand and it can only go on the left pan: $1$ option.
- Otherwise, before that moment only even weights lie on the balance and the left pan is not lighter, so the difference "left minus right" is even and non-negative. It cannot be zero: sums of distinct subsets of powers of two are distinct, so the difference is even and at least $2$. Hence the weight $1$ may go on either pan: $2$ options.

Altogether the number of insertions is $1+2(n-1)=2n-1$, so
$$f(n)=(2n-1)\,f(n-1),\qquad f(1)=1 .$$

*Answer.* $f(n)=1\cdot3\cdot5\cdots(2n-1)=(2n-1)!!$.`,
  tags:["recursion","binary weights","counting"] },

"2012-1": { title:"The midpoint of ST",
  statement: String.raw`Given a triangle $ABC$, let $J$ be the centre of the excircle opposite the vertex $A$. This excircle is tangent to the side $BC$ at $M$, and to the lines $AB$ and $AC$ at $K$ and $L$ respectively. The lines $LM$ and $BJ$ meet at $F$, and the lines $KM$ and $CJ$ meet at $G$. Let $S$ be the point of intersection of the lines $AF$ and $BC$, and let $T$ be the point of intersection of the lines $AG$ and $BC$. Prove that $M$ is the midpoint of $ST$.`,
  hints:[ String.raw`Tangent segments: $BK=BM$ and $CL=CM$. What is then the line $BJ$ with respect to the segment $KM$?`,
          String.raw`$BJ$ is the perpendicular bisector of $KM$ (since $BK=BM$ and $BJ$ bisects the angle $KBM$). Similarly $CJ$ is the perpendicular bisector of $LM$.`,
          String.raw`Hence $FK=FM$ and $GL=GM$; an angle chase then yields $\angle ASB$ and $\angle ATB$, giving $MS=MT$.`],
  solution: String.raw`*Key lemma.* The excircle touches line $AB$ at $K$ and $BC$ at $M$, so $BK=BM$ (tangent segments from $B$). Moreover $BJ$ bisects the angle $KBM$ (the external angle at $B$). In the isosceles triangle $KBM$ the bisector from the apex gives: **$BJ$ is the perpendicular bisector of the segment $KM$.** Similarly, from $CL=CM$, **$CJ$ is the perpendicular bisector of $LM$**.

Consequences: since $F\in BJ$ we get $FK=FM$; since $G\in CJ$ we get $GL=GM$. So the triangles $FKM$ and $GLM$ are isosceles, and
$$\angle FMK=\angle FKM,\qquad \angle GML=\angle GLM .$$

*Outline of the finish.* Using the isosceles triangles and the fact that $\angle(LM,BC)=\frac{\gamma}{2}$, $\angle(KM,BC)=\frac{\beta}{2}$ (from the isosceles triangles $CLM$ and $BKM$), an angle chase gives
$$\angle MFA=90^{\circ}\quad\text{and}\quad \angle MGA=90^{\circ},$$
i.e. $F$ and $G$ are the feet of the perpendiculars from $M$ to the lines $AF$ and $AG$. From this $MS$ and $MT$ get the same expression in terms of the distance from $M$ to $A$ and the angles, which gives $MS=MT$, i.e. $M$ is the midpoint of $ST$.

*Remark.* The substance is the lemma about perpendicular bisectors; the closing angle chase is best done with the notation $\beta=\angle ABC$, $\gamma=\angle BCA$ and all angles at $M$ expressed through $\frac\beta2,\frac\gamma2$.`,
  tags:["excircle","tangent segments","perpendicular bisector"] },

"2012-2": { title:"A product of powers of binomials",
  statement: String.raw`Let $n\ge 3$ be an integer and let $a_{2},a_{3},\dots,a_{n}$ be positive real numbers with $a_{2}a_{3}\cdots a_{n}=1$. Prove that
$$\left(1+a_{2}\right)^{2}\left(1+a_{3}\right)^{3}\cdots\left(1+a_{n}\right)^{n}\ >\ n^{n}.$$`,
  hints:[ String.raw`Bound each factor separately: apply AM–GM to $k$ numbers by splitting $1$ into $k-1$ equal parts.`,
          String.raw`$1+a_{k}=\underbrace{\frac{1}{k-1}+\cdots+\frac{1}{k-1}}_{k-1}+a_{k}\ \ge\ k\sqrt[k]{\frac{a_{k}}{(k-1)^{k-1}}}$.`,
          String.raw`Raise to the $k$-th power, multiply over $k=2,\dots,n$ and note that $\prod \frac{k^{k}}{(k-1)^{k-1}}$ telescopes.`],
  solution: String.raw`For each $k=2,\dots,n$ apply AM–GM to $k$ numbers: $k-1$ copies of $\frac{1}{k-1}$ and the number $a_{k}$:
$$1+a_{k}=\underbrace{\frac{1}{k-1}+\cdots+\frac{1}{k-1}}_{k-1\ \text{terms}}+a_{k}\ \ge\ k\sqrt[k]{\frac{a_{k}}{(k-1)^{k-1}}} .$$
Raise to the $k$-th power:
$$\left(1+a_{k}\right)^{k}\ \ge\ \frac{k^{k}}{(k-1)^{k-1}}\,a_{k} .$$
Multiplying over $k=2,\dots,n$,
$$\prod_{k=2}^{n}\left(1+a_{k}\right)^{k}\ \ge\ \left(\prod_{k=2}^{n}a_{k}\right)\cdot\prod_{k=2}^{n}\frac{k^{k}}{(k-1)^{k-1}}=1\cdot\frac{\prod_{k=2}^{n}k^{k}}{\prod_{j=1}^{n-1}j^{j}}=n^{n},$$
as the product telescopes.

*Strictness.* Equality in the $k$-th application of AM–GM requires $a_{k}=\frac{1}{k-1}$ for every $k$, but then
$$a_{2}a_{3}\cdots a_{n}=\frac{1}{1\cdot2\cdots(n-1)}=\frac{1}{(n-1)!}\ne 1\quad\text{for } n\ge 3 .$$
So at least one inequality is strict and
$$\left(1+a_{2}\right)^{2}\cdots\left(1+a_{n}\right)^{n}>n^{n}. \qquad\blacksquare$$`,
  tags:["AM–GM","telescoping","strictness"] },

"2013-1": { title:"A product of factors (1 + 1/m)",
  statement: String.raw`Prove that for any pair of positive integers $k$ and $n$ there exist positive integers $m_{1},m_{2},\dots,m_{k}$ (not necessarily different) such that
$$1+\frac{2^{k}-1}{2^{n}}=\left(1+\frac{1}{m_{1}}\right)\left(1+\frac{1}{m_{2}}\right)\cdots\left(1+\frac{1}{m_{k}}\right).$$`,
  hints:[ String.raw`Induct on $k$. Try to split off one factor so that the rest has the same shape with a smaller $k$.`,
          String.raw`Compare $B=1+\frac{2^{k+1}-1}{2^{n}}$ and $A=1+\frac{2^{k}-1}{2^{n-1}}$: compute the ratio $B/A$.`,
          String.raw`You get $\frac{B}{A}=1+\frac{1}{2^{n}+2^{k+1}-2}$ — exactly the required shape. Do not forget the base case: at $n=0$ the number $2^{k}$ equals $\left(1+\frac11\right)^{k}$.`],
  solution: String.raw`We prove the more general statement: for all integers $k\ge 1$ and $n\ge 0$ the number $1+\dfrac{2^{k}-1}{2^{n}}$ is a product of exactly $k$ factors of the form $1+\frac{1}{m}$ with positive integers $m$.

*Base $k=1$.* $1+\dfrac{1}{2^{n}}$ is already of the required form with $m_{1}=2^{n}$.

*Step $k\to k+1$.* Let $n\ge 1$. Put
$$A=1+\frac{2^{k}-1}{2^{n-1}}=\frac{2^{n-1}+2^{k}-1}{2^{n-1}},\qquad B=1+\frac{2^{k+1}-1}{2^{n}}=\frac{2^{n}+2^{k+1}-1}{2^{n}} .$$
Then
$$\frac{B}{A}=\frac{\left(2^{n}+2^{k+1}-1\right)2^{n-1}}{2^{n}\left(2^{n-1}+2^{k}-1\right)}=\frac{2^{n}+2^{k+1}-1}{2\left(2^{n-1}+2^{k}-1\right)}=\frac{2^{n}+2^{k+1}-1}{2^{n}+2^{k+1}-2}=1+\frac{1}{2^{n}+2^{k+1}-2}.$$
The number $m=2^{n}+2^{k+1}-2$ is a positive integer (for $n\ge1,k\ge1$ it is $\ge 2$). By the induction hypothesis $A$ is a product of $k$ factors of the required form, so
$$B=A\cdot\left(1+\frac1m\right)$$
is a product of $k+1$ such factors.

It remains to cover $n=0$:
$$1+\frac{2^{k}-1}{2^{0}}=2^{k}=\underbrace{\left(1+\frac{1}{1}\right)\cdots\left(1+\frac{1}{1}\right)}_{k},$$
so the statement holds for every $k$ at $n=0$, which serves as the base of the induction on $n$ used in the step. $\blacksquare$`,
  tags:["induction","telescoping factorisation","identity"] },

"2013-4": { title:"Three collinear points",
  statement: String.raw`Let $ABC$ be an acute-angled triangle with orthocentre $H$, and let $W$ be a point on the side $BC$, strictly between $B$ and $C$. The points $M$ and $N$ are the feet of the altitudes from $B$ and $C$ respectively. Let $\omega_{1}$ be the circumcircle of $BWN$ and let $X$ be the point on $\omega_{1}$ such that $WX$ is a diameter of $\omega_{1}$. Similarly, let $\omega_{2}$ be the circumcircle of $CWM$ and let $Y$ be the point on $\omega_{2}$ such that $WY$ is a diameter of $\omega_{2}$. Prove that $X$, $Y$ and $H$ are collinear.`,
  hints:[ String.raw`$WX$ is a diameter of $\omega_{1}$ and $B\in\omega_{1}$: what does that say about the angle $\angle WBX$?`,
          String.raw`$\angle WBX=90^{\circ}$, i.e. $BX\perp BC$. Similarly $CY\perp BC$: the points $X$ and $Y$ lie on the perpendiculars to $BC$ at $B$ and $C$.`,
          String.raw`Set coordinates: $B=(0,0)$, $C=(a,0)$, $A=(p,q)$, $W=(w,0)$. Compute $BX$ and $CY$ in terms of $p,q,a,w$ and compare with $H=\left(p,\frac{p(a-p)}{q}\right)$.`],
  solution: String.raw`*Step 1: where $X$ and $Y$ are.* Since $WX$ is a diameter of $\omega_{1}$ and $B\in\omega_{1}$, the angle $\angle WBX$ subtends a diameter, so $\angle WBX=90^{\circ}$, i.e.
$$BX\perp BC .$$
Similarly $CY\perp BC$. So $X$ lies on the perpendicular to $BC$ at $B$, and $Y$ on the perpendicular to $BC$ at $C$.

*Step 2: coordinates.* Put $B=(0,0)$, $C=(a,0)$, $A=(p,q)$ with $q>0$, $W=(w,0)$, $0<w<a$. Then $X=(0,\,x)$ and $Y=(a,\,y)$ for some $x,y$, and the orthocentre is
$$H=\left(p,\ \frac{p(a-p)}{q}\right)$$
(the line $AH$ is vertical, and $BH\perp AC$ gives the stated ordinate).

Let us find $x$. The point $N$ is the foot of the perpendicular from $C$ to $AB$; projecting $C=(a,0)$ onto the line through $B$ with direction $(p,q)$,
$$N=\frac{ap}{p^{2}+q^{2}}\,(p,q).$$
Since $N\in\omega_{1}$ and $WX$ is a diameter, $\angle WNX=90^{\circ}$, that is $(N-X)\cdot(N-W)=0$. Writing $N=(n_{1},n_{2})$,
$$n_{1}\left(n_{1}-w\right)+\left(n_{2}-x\right)n_{2}=0\ \Longrightarrow\ x=\frac{|N|^{2}-n_{1}w}{n_{2}} .$$
Substituting $n_{1}=\frac{ap^{2}}{p^{2}+q^{2}}$, $n_{2}=\frac{apq}{p^{2}+q^{2}}$, $|N|^{2}=\frac{a^{2}p^{2}}{p^{2}+q^{2}}$ and simplifying,
$$x=\frac{p\,(a-w)}{q}.$$
The same computation with the roles of $B$ and $C$ exchanged (that is, $p\mapsto a-p$, $w\mapsto a-w$) gives
$$y=\frac{(a-p)\,w}{q}.$$

*Step 3: collinearity.* The line $XY$ joins $(0,x)$ and $(a,y)$; at abscissa $p$ its ordinate is
$$x\cdot\frac{a-p}{a}+y\cdot\frac{p}{a}=\frac{1}{a}\left(\frac{p(a-w)}{q}(a-p)+\frac{(a-p)w}{q}\,p\right)=\frac{p(a-p)}{aq}\Bigl((a-w)+w\Bigr)=\frac{p(a-p)}{q}.$$
That is precisely the ordinate of $H$. So $H$ lies on the line $XY$, i.e. $X$, $Y$, $H$ are collinear. $\blacksquare$`,
  tags:["angle in a semicircle","coordinates","orthocentre"] },

"2014-1": { title:"A unique index n",
  statement: String.raw`Let $a_{0}<a_{1}<a_{2}<\cdots$ be an infinite sequence of positive integers. Prove that there exists a unique integer $n\ge1$ such that
$$a_{n}\ <\ \frac{a_{0}+a_{1}+\cdots+a_{n}}{n}\ \le\ a_{n+1}.$$`,
  hints:[ String.raw`Write $S_{n}=a_{0}+\cdots+a_{n}$ and consider the quantity $d_{n}=S_{n}-n\,a_{n}$.`,
          String.raw`Compute $d_{n+1}-d_{n}$: you get $n\left(a_{n}-a_{n+1}\right)<0$, so $d_{n}$ is strictly decreasing.`,
          String.raw`Check that the first inequality is equivalent to $d_{n}>0$ and the second to $d_{n+1}\le 0$. Then note $d_{1}>0$ and $d_{n}\to-\infty$.`],
  solution: String.raw`Put $S_{n}=a_{0}+a_{1}+\cdots+a_{n}$ and
$$d_{n}=S_{n}-n\,a_{n},\qquad n\ge 1 .$$

*Step 1: reformulation.* The first inequality $n\,a_{n}<S_{n}$ is equivalent to $d_{n}>0$. The second, $S_{n}\le n\,a_{n+1}$, is equivalent to
$$S_{n+1}=S_{n}+a_{n+1}\le (n+1)a_{n+1}\iff d_{n+1}\le 0 .$$
So we must show there is a unique $n\ge1$ with
$$d_{n}>0\ \ \text{and}\ \ d_{n+1}\le 0 .$$

*Step 2: monotonicity.* For every $n\ge1$,
$$d_{n+1}-d_{n}=\left(S_{n}+a_{n+1}-(n+1)a_{n+1}\right)-\left(S_{n}-n\,a_{n}\right)=n\left(a_{n}-a_{n+1}\right)\ \le\ -n\ <\ 0,$$
since the sequence is strictly increasing and integer-valued. So $d_{n}$ is strictly decreasing, and in fact $d_{n}\to-\infty$ (the increments are at most $-n$).

*Step 3: the ends.* $d_{1}=S_{1}-a_{1}=a_{0}>0$. As $d_{n}$ decreases strictly from a positive value to $-\infty$, there is a unique index $n\ge1$ with $d_{n}>0\ge d_{n+1}$.

That is the required unique $n$. $\blacksquare$`,
  tags:["monotonicity","partial sums","existence and uniqueness"] },

"2014-4": { title:"An intersection on the circumcircle",
  statement: String.raw`Points $P$ and $Q$ lie on the side $BC$ of an acute-angled triangle $ABC$ so that $\angle PAB=\angle BCA$ and $\angle CAQ=\angle ABC$. Points $M$ and $N$ lie on the lines $AP$ and $AQ$ respectively, such that $P$ is the midpoint of $AM$ and $Q$ is the midpoint of $AN$. Prove that the lines $BM$ and $CN$ meet on the circumcircle of triangle $ABC$.`,
  hints:[ String.raw`From $\angle PAB=\angle BCA$ the triangles $ABP$ and $CBA$ are similar. What does that give for $BP$?`,
          String.raw`You get $AB^{2}=BP\cdot BC$ and similarly $AC^{2}=CQ\cdot CB$.`,
          String.raw`Write $X=BM\cap CN$. The point $X$ lies on the circumcircle exactly when $\angle XBC+\angle XCB=\angle BAC$. Compute $\sin\angle MBC$ and $\sin\angle NCB$ with the sine rule.`],
  solution: String.raw`Write $\alpha=\angle BAC$, $\beta=\angle ABC$, $\gamma=\angle BCA$ and $a=BC$, $b=CA$, $c=AB$.

*Step 1: lengths.* Triangles $ABP$ and $CBA$ share the angle at $B$ and $\angle PAB=\gamma=\angle ACB$, so $\triangle ABP\sim\triangle CBA$ and
$$\frac{BP}{BA}=\frac{BA}{BC}\ \Longrightarrow\ BP=\frac{c^{2}}{a}.$$
Moreover the angles of triangle $ABP$ are $\gamma$ (at $A$), $\beta$ (at $B$) and $\alpha$ (at $P$), so by the sine rule
$$AP=\frac{c\sin\beta}{\sin\alpha}=\frac{bc}{a}\qquad\left(\text{since }\frac{\sin\beta}{\sin\alpha}=\frac ba\right).$$
As $P$ is the midpoint of $AM$, $PM=AP=\frac{bc}{a}$ and $\angle BPM=180^{\circ}-\angle APB=180^{\circ}-\alpha$.

*Step 2: computing $\angle MBC$.* By the cosine rule in triangle $BPM$,
$$BM^{2}=BP^{2}+PM^{2}-2\,BP\cdot PM\cos\left(180^{\circ}-\alpha\right)=\frac{c^{2}}{a^{2}}\left(c^{2}+b^{2}+2bc\cos\alpha\right).$$
Write $D=b^{2}+c^{2}+2bc\cos\alpha$; then $BM=\frac{c\sqrt D}{a}$. By the sine rule in the same triangle,
$$\frac{PM}{\sin\angle MBP}=\frac{BM}{\sin\angle BPM}\ \Longrightarrow\ \sin\angle MBC=\frac{PM\sin\alpha}{BM}=\frac{b\sin\alpha}{\sqrt D}.$$
Symmetrically (swapping $b\leftrightarrow c$),
$$\sin\angle NCB=\frac{c\sin\alpha}{\sqrt D}.$$

*Step 3: the sum of the angles.* Put $u=\angle MBC$, $v=\angle NCB$. Note that
$$D-c^{2}\sin^{2}\alpha=b^{2}+c^{2}\cos^{2}\alpha+2bc\cos\alpha=\left(b+c\cos\alpha\right)^{2},$$
so $\cos v=\dfrac{b+c\cos\alpha}{\sqrt D}$; similarly $\cos u=\dfrac{c+b\cos\alpha}{\sqrt D}$. Then
$$\sin(u+v)=\sin u\cos v+\cos u\sin v=\frac{\sin\alpha}{D}\Bigl(b\left(b+c\cos\alpha\right)+c\left(c+b\cos\alpha\right)\Bigr)=\frac{\sin\alpha}{D}\cdot D=\sin\alpha .$$
Since $u,v$ are acute and $u+v<180^{\circ}$, the geometric configuration forces $u+v=\alpha$.

*Step 4: conclusion.* Let $X=BM\cap CN$ (on the same side of $BC$ as $M,N$, i.e. opposite to $A$). In triangle $XBC$,
$$\angle BXC=180^{\circ}-\left(\angle XBC+\angle XCB\right)=180^{\circ}-(u+v)=180^{\circ}-\alpha .$$
So $ABXC$ is cyclic ($\angle BAC+\angle BXC=180^{\circ}$), i.e. $X$ lies on the circumcircle of $ABC$. $\blacksquare$`,
  tags:["similarity","sine rule","cyclic quadrilateral"] },

"2015-1": { title:"Balanced sets of points",
  statement: String.raw`A finite set $S$ of points in the plane is called balanced if for any two different points $A,B\in S$ there is a point $C\in S$ with $AC=BC$. It is called centre-free if there are no four points $A,B,C,P\in S$ (with $A,B,C$ distinct) such that $PA=PB=PC$.

(a) Show that for every integer $n\ge3$ there exists a balanced set of $n$ points.
(b) Determine all integers $n\ge3$ for which there exists a balanced centre-free set of $n$ points.`,
  answer: String.raw`(b) exactly the odd $n\ge3$.`,
  hints:[ String.raw`For (a) with odd $n$ a regular $n$-gon works. For even $n$ try a construction made of equilateral triangles with a common vertex.`,
          String.raw`For (b) count pairs: for a fixed point $C$ split the remaining points into circles centred at $C$. What does centre-freeness say about the sizes of those circles?`,
          String.raw`Each point can serve at most $\left\lfloor\frac{n-1}{2}\right\rfloor$ pairs, while there are $\binom n2$ pairs. Compare $n\left\lfloor\frac{n-1}{2}\right\rfloor$ with $\binom n2$.`],
  solution: String.raw`*(a) Construction.*

Odd $n$: the vertices of a regular $n$-gon. For any two vertices $A,B$ the perpendicular bisector of $AB$ passes through a vertex (as $n$ is odd), and that vertex is equidistant from $A$ and $B$.

Even $n=2m+2$: take a point $P$ and place on the circle of radius $r$ about $P$ the points
$$A_{1},B_{1},A_{2},B_{2},\dots,A_{m},B_{m},\ Z,$$
where $A_{i}$ is at angle $\theta_{i}$, $B_{i}$ at angle $\theta_{i}+60^{\circ}$, and $Z$ at angle $\theta_{1}-60^{\circ}$ (the $\theta_{i}$ chosen so that all points are distinct). That is $1+2m+1=n$ points. Balance:
- any two points on the circle are equidistant from $P$;
- the pair $\{P,A_{i}\}$: the point $B_{i}$ works, since $\angle A_{i}PB_{i}=60^{\circ}$, so $PA_{i}B_{i}$ is equilateral and $B_{i}A_{i}=B_{i}P=r$;
- the pair $\{P,B_{i}\}$: symmetrically $A_{i}$ works;
- the pair $\{P,Z\}$: $A_{1}$ works, since $\angle ZPA_{1}=60^{\circ}$ and $A_{1}Z=A_{1}P=r$.

*(b) The bound.* Let $S$ be balanced and centre-free with $|S|=n$. For a point $C\in S$ split the other $n-1$ points by their distance to $C$ (concentric circles about $C$). Centre-freeness means no such circle contains three points, i.e. each class has at most $2$ points. The point $C$ can serve as the "apex" only for pairs lying in one class, so $C$ serves at most
$$\left\lfloor\frac{n-1}{2}\right\rfloor$$
pairs. Each of the $\binom n2$ pairs is served by at least one point, so
$$\binom{n}{2}\ \le\ n\left\lfloor\frac{n-1}{2}\right\rfloor .$$
If $n$ is even then $\left\lfloor\frac{n-1}{2}\right\rfloor=\frac{n-2}{2}$ and the right side equals $\frac{n(n-2)}{2}<\frac{n(n-1)}{2}$ — a contradiction. So $n$ is odd.

For odd $n$ the regular $n$-gon is centre-free: its centre is not in the set, and no vertex is equidistant from three other vertices (three such vertices would give two on one circle about it, impossible for a regular $n$-gon with $n$ odd).

Answer: such sets exist exactly for odd $n\ge 3$.`,
  tags:["double counting","geometric construction","perpendicular bisectors"] },

"2015-2": { title:"Three powers of two",
  statement: String.raw`Determine all triples $(a,b,c)$ of positive integers such that each of the numbers
$$ab-c,\qquad bc-a,\qquad ca-b$$
is a power of $2$ (that is, of the form $2^{t}$ with an integer $t\ge0$).`,
  answer: String.raw`$(2,2,2)$, $(2,2,3)$, $(2,6,11)$, $(3,5,7)$ and all their permutations.`,
  hints:[ String.raw`First handle the case where two of $a,b,c$ are equal.`,
          String.raw`Assume $a\le b\le c$ and analyse parity: if all three are even, all three expressions are even — what follows?`,
          String.raw`A useful relation: $bc-a$ and $ca-b$ are powers of two, so their sum and difference are tightly constrained; consider $b(c-1)$ and $a(c-1)$ modulo powers of two.`],
  solution: String.raw`*Checking the answers.*
$(2,2,2)$: $4-2=2$, all three expressions equal $2$.
$(2,2,3)$: $ab-c=4-3=1=2^{0}$, $bc-a=6-2=4$, $ca-b=6-2=4$.
$(2,6,11)$: $ab-c=12-11=1$, $bc-a=66-2=64$, $ca-b=22-6=16$.
$(3,5,7)$: $ab-c=15-7=8$, $bc-a=35-3=32$, $ca-b=21-5=16$.

*Outline of completeness.* We may assume $a\le b\le c$.

1. If $a=b=c$ then $a^{2}-a=a(a-1)$ is a power of two, forcing $a=2$ (for $a\ge3$ both $a$ and $a-1$ cannot cooperate). This gives $(2,2,2)$.
2. If exactly two are equal, the analysis yields $(2,2,3)$ (up to permutation).
3. Main case $a<b<c$. Parity: not all three can be odd (then $ab-c$ is odd, hence equal to $1$, and likewise for the others, leading quickly to a contradiction after a finite check). Combining the parity analysis with size estimates ($ab-c<ab$, $bc-a$ close to $bc$, and so on) reduces the problem to a small number of cases, whose inspection gives $(2,6,11)$ and $(3,5,7)$.

Writing this out requires careful treatment of about six parity cases; the substance is parity plus the estimate "a power of two cannot differ much from the product".

Answer: $(2,2,2)$, $(2,2,3)$, $(2,6,11)$, $(3,5,7)$ and their permutations.`,
  tags:["powers of two","parity","case analysis"] },

"2016-2": { title:"A table of the letters I, M, O",
  statement: String.raw`Find all positive integers $n$ for which each cell of an $n\times n$ table can be filled with one of the letters $I$, $M$ and $O$ in such a way that:
— in each row and each column, one third of the entries are $I$, one third are $M$ and one third are $O$;
— in any diagonal whose number of cells is a multiple of three, one third of the entries are $I$, one third are $M$ and one third are $O$.

(Diagonals are all the lines of cells at $45^{\circ}$ to the sides of the table, in both directions.)`,
  answer: String.raw`Exactly the multiples of $9$.`,
  hints:[ String.raw`The row condition gives $3\mid n$ at once. One has to prove more: $9\mid n$.`,
          String.raw`Assign the cube roots of unity $1,\omega,\omega^{2}$ to $I,M,O$ and sum over rows, columns and diagonals.`,
          String.raw`A convenient weighting: give the cell $(i,j)$ a weight depending on $i+j$ and $i-j$ modulo $3$, and compute one and the same sum in two ways.`],
  solution: String.raw`*Necessity of $3\mid n$.* Each row has exactly one third of each letter, so $n$ is divisible by $3$.

*Necessity of $9\mid n$ (outline).* Assign to $I,M,O$ the complex numbers $1,\omega,\omega^{2}$ with $\omega=e^{2\pi i/3}$. The condition "exactly one third of each letter" on a line whose length is a multiple of three says precisely that the sum of the assigned numbers along that line is zero.

Consider
$$\Sigma=\sum_{(i,j)}c_{ij}\,\varepsilon(i,j),$$
where $c_{ij}$ is the number assigned to the cell and the weight $\varepsilon(i,j)$ depends only on the residues of $i+j$ and $i-j$ modulo $3$. Summing along the diagonals of one direction gives $\Sigma=0$ (the long diagonals vanish and the short ones group so that their contribution cancels). Summing the same quantity along the other diagonal direction and along rows and columns produces an expression for $\Sigma$ proportional to $\frac{n}{3}$ modulo $3$. Comparing the two computations gives $3\mid\frac n3$, i.e. $9\mid n$.

*Sufficiency.* For $n=9$ one constructs an explicit $9\times9$ table; then a $9k\times9k$ table is assembled from copies of that block, which preserves all conditions (rows and columns split into block pieces, and diagonals into diagonals of the blocks).

Answer: the multiples of $9$.`,
  tags:["roots of unity","double counting","colouring","block construction"] },

"2016-5": { title:"Erasing factors",
  statement: String.raw`The equation
$$(x-1)(x-2)\cdots(x-2016)=(x-1)(x-2)\cdots(x-2016)$$
is written on the board, with $2016$ linear factors on each side. Determine the least possible value of $k$ for which it is possible to erase exactly $k$ of these $4032$ linear factors so that at least one factor remains on each side and the resulting equation has no real solutions.`,
  answer: String.raw`$k=2016$.`,
  hints:[ String.raw`If a factor $(x-j)$ remains on one side and is erased on the other, then $x=j$ is a root. What does that force?`,
          String.raw`For each $j$ the factor $(x-j)$ must be erased on both sides or kept on both — but then the two sides coincide!`,
          String.raw`So for every $j$ exactly one copy of $(x-j)$ is erased, giving $k\ge 2016$; now build an example with $k=2016$ by splitting $1,\dots,2016$ into blocks of four.`],
  solution: String.raw`*Lower bound $k\ge 2016$.* After erasing we obtain an equation $P(x)=Q(x)$, where $P$ is the product of the factors left on the left and $Q$ of those on the right. If for some $j$ the factor $(x-j)$ remains on exactly one side, then at $x=j$ that side vanishes while the other does not, so $x=j$ is a root. To avoid roots, for each $j$ the factor must be present on both sides or absent from both.

But then the profiles of remaining factors coincide on both sides, so $P\equiv Q$ and the equation has infinitely many roots. Hence for every $j\in\{1,\dots,2016\}$ at least one copy of $(x-j)$ must be erased, i.e. $k\ge 2016$.

*An example with $k=2016$.* Split $\{1,2,\dots,2016\}$ into $504$ blocks $\{4m+1,4m+2,4m+3,4m+4\}$. Keep on the left the factors with indices $\equiv 1,0 \pmod 4$ and on the right those with indices $\equiv 2,3\pmod 4$ (each index is erased on exactly one side, $2016$ erasures in total). The resulting equation
$$\prod_{m=0}^{503}(x-4m-1)(x-4m-4)=\prod_{m=0}^{503}(x-4m-2)(x-4m-3)$$
has no real roots: a sign analysis interval by interval shows that for every real $x$ the two sides are never equal, because within each block of four the pairings compare in a fixed direction.

Answer: $k=2016$.`,
  tags:["polynomials","signs on intervals","construction"] },

"2017-1": { title:"Square root or plus three",
  statement: String.raw`For each integer $a_{0}>1$ define the sequence $a_{0},a_{1},a_{2},\dots$ by
$$a_{n+1}=\begin{cases}\sqrt{a_{n}},&\text{if }\sqrt{a_{n}}\text{ is an integer},\\ a_{n}+3,&\text{otherwise},\end{cases}\qquad n\ge0 .$$
Determine all values of $a_{0}$ for which there is a number $A$ such that $a_{n}=A$ for infinitely many $n$.`,
  answer: String.raw`Exactly the multiples of $3$.`,
  hints:[ String.raw`Look at residues modulo $3$: squares are $0$ or $1$ mod $3$. What happens if $a_{0}\equiv2\pmod3$?`,
          String.raw`If $3\mid a_{0}$ the sequence falls into the cycle $3\to6\to9\to3$.`,
          String.raw`If $a_{0}\equiv1\pmod 3$, each square root gives a number $\equiv1$ or $\equiv2\pmod3$; in the second case the sequence escapes to infinity. Track how the values at the square-root moments decrease.`],
  solution: String.raw`*Case $3\mid a_{0}$.* Adding $3$ preserves divisibility by $3$, and if $a_{n}=k^{2}$ is divisible by $3$ then $3\mid k$, so divisibility survives the square root too. Hence every term is divisible by $3$. The sequence cannot increase forever: among the multiples of three $a,a+3,a+6,\dots$ there are squares (e.g. $9m^{2}$), so square roots are taken infinitely often and the values at those moments decrease until the sequence falls into the cycle
$$3\to 6\to 9\to 3\to\cdots$$
($9$ is a square with $\sqrt9=3$). So $A=3$ occurs infinitely often.

*Case $a_{0}\equiv2\pmod3$.* Squares of integers are $\equiv 0$ or $1$ modulo $3$, so a number $\equiv2\pmod3$ is never a square. Adding $3$ preserves the residue, so the root is never taken and $a_{n}=a_{0}+3n\to\infty$: no value repeats.

*Case $a_{0}\equiv1\pmod3$.* While the terms are $\equiv 1$ modulo $3$, square roots may occur. If $a_{n}=k^{2}\equiv1\pmod 3$, then $k\equiv1$ or $k\equiv2\pmod3$.
- If $k\equiv2\pmod3$, the sequence from then on lies in the class $2$ modulo $3$ and, by the previous case, goes to infinity.
- If $k\equiv1\pmod3$, the sequence stays in the class $1$, but the value has strictly decreased.

The values at the square-root moments form a strictly decreasing sequence of positive integers, so only finitely many square roots can keep us in class $1$. Sooner or later either a root $\equiv2\pmod3$ appears (and the sequence escapes), or the value reaches $4$: then $\sqrt4=2\equiv2\pmod3$ and again it escapes. The value $1$ is unreachable, since $a_{0}>1$ and from class $1$ one can only arrive at $1$ from $1$. So for $a_{0}\equiv1\pmod3$ no value repeats infinitely often.

Answer: such an $A$ exists exactly when $3\mid a_{0}$ (and then $A=3$).`,
  tags:["residues modulo 3","quadratic residues","descent"] },

"2017-2": { title:"The equation f(f(x)f(y)) + f(x+y) = f(xy)",
  statement: String.raw`Let $\mathbb{R}$ be the set of real numbers. Determine all functions $f:\mathbb{R}\to\mathbb{R}$ such that
$$f\left(f(x)f(y)\right)+f(x+y)=f(xy)$$
for all real numbers $x,y$.`,
  answer: String.raw`$f\equiv0$, $f(x)=x-1$ and $f(x)=1-x$.`,
  hints:[ String.raw`Check that all three answers work — it helps to see the structure.`,
          String.raw`Substitute $y=0$ and investigate the value $f(0)$.`,
          String.raw`A useful pair of substitutions: $x=y=0$, then $(x,y)=(x,1)$ and $(x,y)=(x+1,1)$ to relate $f(x+1)$ and $f(x)$.`],
  solution: String.raw`*Checking the answers.*
$f\equiv0$: both sides vanish.
$f(x)=x-1$: $f(f(x)f(y))=(x-1)(y-1)-1=xy-x-y$ and $f(x+y)=x+y-1$; the sum is $xy-1=f(xy)$ ✓.
$f(x)=1-x$: $f(x)f(y)=(1-x)(1-y)$, so $f\left((1-x)(1-y)\right)=1-(1-x)(1-y)=x+y-xy$, and $f(x+y)=1-x-y$; the sum is $1-xy=f(xy)$ ✓.

*Outline of completeness.* Let $f$ be a solution that is not identically zero.

1. Substituting $x=y=0$ gives $f\left(f(0)^{2}\right)+f(0)=f(0)$, i.e. $f\left(f(0)^{2}\right)=0$: the function has a root.
2. If $f(a)=0$, then substituting $x=a$ and arbitrary $y$ gives $f(0)+f(a+y)=f(ay)$ — a strong relation linking additive and multiplicative shifts.
3. From it one deduces that $f$ is injective away from its roots, that the root is unique, and that $f(x+1)-f(x)$ is constant; hence $f$ is linear, $f(x)=cx+d$.
4. Substituting the linear form into the original equation gives $c=\pm1$ and $d=-c$, i.e. $f(x)=x-1$ or $f(x)=1-x$.

Carrying out steps 2–3 in full is the main work in this problem.

Answer: $f\equiv0$, $f(x)=x-1$, $f(x)=1-x$.`,
  tags:["functional equations","substitutions","linearity"] }

});
