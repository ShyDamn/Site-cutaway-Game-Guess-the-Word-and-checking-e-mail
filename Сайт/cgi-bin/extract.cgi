#!/usr/bin/perl
print "Content-type:text/html\n\n";

$method=$ENV{'REQUEST_METHOD'};

if ($method eq "POST")
{
	$length = $ENV{'CONTENT_LENGTH'};
	read(STDIN, $request, $length);
}
else
{
	$request = $ENV{'QUERY_STRING'};
}

print "<br>Method: ", $method, "\n";
print "<br>Query String: ", $request, "\n";

$request=~s/\+/\ /g;

@params = split(/&/, $request);
$n_par = @params;
print "<br><br>А теперь отдельные пары:";

for ($i=0; $i < $n_par; $i++)
{

	($name, $value) = split(/=/, $params[$i]);

	$name=~s/%([0-9A-Fa-f][0-9A-Fa-f])/chr(hex($1))/ge;
	$value=~s/%([0-9A-Fa-f][0-9A-Fa-f])/chr(hex($1))/ge;

	$name =~ tr/a-z/A-Z/;

	$res{$name} = $value;

	print "<br>пара <b>", $i,"</b>: Имя: <i>",$name,"</i> = Значение: <i>",$value, "</i>";
}

$a=int($res{"A"});
$b=int($res{"B"});
$c=int($res{"C"});

if($c==1) {
	print "<br>a + b = ", $a+$b;
} elsif($c==2){
	print "<br>a - b = ", $a-$b;
} elsif($c==3){
	print "<br>a * b = ", $a*$b;
} elsif($c==4){
	if($b==0){
		print "<br>На ноль делить нельзя";
	}else{
		print "<br>a / b = ", $a/$b;
	}
}


