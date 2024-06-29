import 'dart:convert';
import 'dart:io';

void main() {
  final file = File(r'.\tblPeople.txt');
  final lines = file.readAsLinesSync(encoding: Encoding.getByName('utf-8')!);

  final headings = lines[0].split(';');
  final people = [];

  for (var i = 1; i < lines.length; i++) {
    final values = lines[i].split(';');
    final person = {};

    for (var j = 0; j < headings.length; j++) {
      person[headings[j]] = values[j];
    }

    people.add(person);
  }

  final database = {
    'database': {'people': people}
  };
  final json = jsonEncode(database);

  final outputFile = File('output.json');
  outputFile.writeAsStringSync(json);

  print('JSON file generated successfully!');
}
