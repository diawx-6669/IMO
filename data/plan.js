/* Маршрут подготовки: три ступени, 14 модулей, покрывающих весь банк.
   Тексты модулей — на русском и английском; остальные языки берут английский. */
window.IMO_PLAN = [

{ id:"n1", stage:1, tech:["small-cases","order","fermat","size-divisibility"],
  problems:["1959-1","1964-1","1962-1","1960-1","1969-1","2005-4"],
  title:{ru:"Делимость, остатки, степени", en:"Divisibility, remainders, powers"},
  desc:{ru:"Самый дешёвый вход в олимпиадную математику: НОД, периодичность степеней по модулю, разложение на множители. Эти задачи решаются за полчаса, если видеть нужный модуль, и не решаются никогда, если не видеть.",
        en:"The cheapest way in: gcd, periodicity of powers modulo n, factoring identities. These fall in half an hour once you see the right modulus, and never if you do not."} },

{ id:"n2", stage:1, tech:["divisor-structure","size-divisibility","bound-and-example"],
  problems:["2002-4","2023-1","2011-1","2025-4","1992-1","1998-4"],
  title:{ru:"Структура делителей и уравнения в целых числах", en:"Divisor structure and integer equations"},
  desc:{ru:"Главный приём здесь — оценка: если A делит B и 0 < B < A, противоречие. Плюс симметрия делителей d·(n/d) = n, которая превращает условие на маленькие делители в условие на большие.",
        en:"The core move is a size estimate: if A divides B and 0 < B < A, you have a contradiction. Add the divisor symmetry d·(n/d) = n, which turns a condition on small divisors into one on large ones."} },

{ id:"n3", stage:1, tech:["order","residues-mod8","valuation","telescope"],
  problems:["2009-1","2017-1","1986-1","1979-1","2019-4","2013-1"],
  title:{ru:"Сравнения, порядки, квадратичные вычеты", en:"Congruences, orders, quadratic residues"},
  desc:{ru:"Как выбирать модуль. Квадраты по модулю 4, 8 и 16; порядок элемента и его деление на p−1; показатель простого в факториале. После этого модуля большинство задач «докажите, что не существует» становятся техническими.",
        en:"How to choose the modulus. Squares mod 4, 8 and 16; the order of an element and why it divides p−1; the exponent of a prime in a factorial. After this module most “prove there is no such n” problems become routine."} },

{ id:"a1", stage:1, tech:["amgm","cauchy","rearrangement","equality-case"],
  problems:["1975-1","2020-2","2023-4","2007-1"],
  title:{ru:"Неравенства: первый инструментарий", en:"Inequalities: the first toolkit"},
  desc:{ru:"AM–GM со взвешенной формой, Коши–Буняковский и лемма Энгеля, неравенство о перестановках. Ключевой навык — проверять, где достигается равенство: если оценка не точна в нужной точке, она бесполезна.",
        en:"AM–GM including the weighted form, Cauchy–Schwarz and the Engel form, the rearrangement inequality. The key habit is checking where equality holds: a bound that is not tight at the right point is useless."} },

{ id:"a2", stage:1, tech:["fe-substitutions","fe-structure","monotone"],
  problems:["2010-1","2019-1","2022-2","2014-1","2024-1"],
  title:{ru:"Функциональные уравнения и последовательности", en:"Functional equations and sequences"},
  desc:{ru:"Стандартный порядок подстановок, поиск f(0), инъективность и инволюции. Для последовательностей — дискретная производная: вводите разность и смотрите на её знак.",
        en:"The standard order of substitutions, finding f(0), injectivity and involutions. For sequences, the discrete derivative: introduce the difference and watch its sign."} },

{ id:"c1", stage:1, tech:["pigeonhole","double-counting","greedy","recurrence-count","games"],
  problems:["1972-1","1994-1","2003-1","2021-1","2011-4","2015-1","2018-4"],
  title:{ru:"Комбинаторика: подсчёт, Дирихле, стратегии", en:"Combinatorics: counting, pigeonhole, strategies"},
  desc:{ru:"Самый недооценённый раздел: здесь почти нет теории, но очень легко написать решение, которое выглядит убедительно и не является доказательством. Следите за тем, чтобы стратегия была правилом на любой ход соперника, а не одним сценарием.",
        en:"The most underrated area: almost no theory, yet it is very easy to write something persuasive that is not a proof. Make sure a strategy is a rule covering every move of the opponent, not one sample game."} },

{ id:"g1", stage:1, tech:["angle-chase","incenter-lemma","perp-bisector","vectors-complex"],
  problems:["2004-1","2006-1","2008-1","2012-1"],
  title:{ru:"Геометрия: углы, окружности, инцентр", en:"Geometry: angles, circles, the incentre"},
  desc:{ru:"Базовый счёт углов и признак вписанного четырёхугольника, лемма о трезубце, равные касательные отрезки. Рисуйте большой и точный чертёж: в геометрии половина решений видна на хорошем рисунке и не видна на плохом.",
        en:"Angle chasing and the cyclic-quadrilateral criterion, the incentre–arc-midpoint lemma, equal tangent segments. Draw large and accurately: half of these solutions are visible on a good diagram and invisible on a bad one."} },

{ id:"g2", stage:1, tech:["power-of-point","tangent-chord","trig-geometry","coordinates"],
  problems:["2009-2","2010-4","2014-4","2018-1","2001-1","2013-4","2005-1"],
  title:{ru:"Геометрия: степень точки, касательные, вычисления", en:"Geometry: power of a point, tangents, computation"},
  desc:{ru:"Степень точки и признак касания, угол между касательной и хордой. Плюс честный расчётный путь: теорема синусов, координаты, векторы. Умение довести вычисление до конца — полноценный способ взять задачу, когда синтетика не идёт.",
        en:"Power of a point and the tangency criterion, the tangent–chord angle. Plus the honest computational route: the sine rule, coordinates, vectors. Pushing a computation through is a legitimate way to take a problem when the synthetic path will not open."} },

{ id:"a3", stage:2, tech:["amgm","substitution","telescope","bound-and-example"],
  problems:["1995-2","2000-2","2008-2","2012-2","1976-4","1977-2","1966-4"],
  title:{ru:"Неравенства и оптимизация", en:"Inequalities and optimisation"},
  desc:{ru:"Подстановки, снимающие ограничение (abc = 1, стороны треугольника), телескопирование, задачи на максимум с обязательной парой «оценка + пример». Отсюда начинается уровень, на котором нужно придумать форму записи, а не вспомнить неравенство.",
        en:"Substitutions that clear a constraint (abc = 1, triangle sides), telescoping, and extremal problems where you owe both a bound and an example. This is where you have to invent the right form rather than recall an inequality."} },

{ id:"a4", stage:2, tech:["polynomials","fe-substitutions","fe-structure","invariant"],
  problems:["2004-2","2006-5","2009-5","2016-5","2017-2","2018-2"],
  title:{ru:"Многочлены, функции, процессы", en:"Polynomials, functions, processes"},
  desc:{ru:"Сравнение коэффициентов, ограничение числа корней, делимость разностей для целочисленных многочленов. Для функций — работа без предположения непрерывности: всё добывается подстановками.",
        en:"Comparing coefficients, bounding the number of roots, and (a−b) | (P(a)−P(b)) for integer polynomials. For functions: everything must come from substitutions, with no continuity assumed."} },

{ id:"n4", stage:2, tech:["vieta-jump","valuation","lte","fermat","extremal"],
  problems:["1981-3","1987-4","2007-5","2015-2","2020-5","2022-5","2024-2"],
  title:{ru:"Спуск по Виету, LTE, тонкая делимость", en:"Vieta jumping, LTE, fine divisibility"},
  desc:{ru:"Техника минимального решения в чистом виде и точный подсчёт показателя простого. Спуск требует аккуратности: нужно доказать и целость второго корня, и его неотрицательность, и строгое убывание — без одного из трёх решение не засчитывается.",
        en:"Minimal-counterexample technique in its purest form, plus exact prime-exponent counting. Vieta jumping demands care: you must prove the second root is an integer, that it is non-negative, and that it is strictly smaller — miss one and the solution does not stand."} },

{ id:"c2", stage:2, tech:["layers","games","graphs","invariant","bound-and-example"],
  problems:["2016-2","2019-5","2020-4","2023-5","2024-5","2025-1"],
  title:{ru:"Комбинаторика: конструкции, игры, процессы", en:"Combinatorics: constructions, games, processes"},
  desc:{ru:"Задачи вида «найдите наименьшее n»: половина работы — конструкция, половина — оценка, и их пишут отдельно. Блочные построения, индукция по слоям, инварианты процессов, адверсарные рассуждения в играх с информацией.",
        en:"“Find the smallest n” problems: half the work is a construction, half is a bound, and they are written separately. Block constructions, induction on layers, process invariants, and adversary arguments in games with hidden information."} },

{ id:"h1", stage:3, tech:["cauchy","substitution","extremal","monotone","fe-bounds"],
  problems:["1983-6","1985-6","2005-3","2006-3","2009-3","2011-3"],
  title:{ru:"Трудная алгебра", en:"Hard algebra"},
  desc:{ru:"Задачи 3 и 6 по алгебре: длинные цепочки оценок, функциональные неравенства, предельные рассуждения. Здесь нормально потратить несколько часов и получить 2 балла — и это правильный результат, если частичный прогресс записан.",
        en:"Algebra in slots 3 and 6: long chains of estimates, functional inequalities, limiting arguments. Spending several hours and earning 2 points is normal here — and it is the right outcome, provided the partial progress is written down."} },

{ id:"h2", stage:3, tech:["vieta-jump","order","lte","residues-mod8","extremal","graphs"],
  problems:["1988-6","1990-3","2001-6","2008-3","2007-3"],
  title:{ru:"Трудная теория чисел и комбинаторика", en:"Hard number theory and combinatorics"},
  desc:{ru:"Легендарные задачи: спуск по Виету в оригинальной формулировке 1988 года, n² | 2ⁿ+1, клики по двум комнатам. Их стоит брать не ради балла, а ради того, чтобы увидеть, как устроены задачи верхнего уровня.",
        en:"The legendary ones: Vieta jumping in its original 1988 wording, n² | 2ⁿ+1, cliques split between two rooms. Take them not for the score but to see how top-slot problems are built."} }

];
