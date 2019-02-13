from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
import uuid
#from areas.models import Boulder_Wall

class Grade(models.Model):
    grade_name = models.CharField(max_length=3, primary_key=True)

    def __str__(self):
        return self.grade_name

class Rating(models.Model):
    rating_stars = models.IntegerField(validators=[MaxValueValidator(5),MinValueValidator(0) ])

    def __str__(self):
        return str(self.rating_stars)

class Problem(models.Model):
    problem_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    problem_name = models.CharField(max_length=200)
    description = models.TextField()
    grade = models.ManyToManyField(Grade)
#    location = models.ForeignKey(Boulder_Wall, on_delete=models.PROTECT)
    stars = models.ForeignKey(Rating, on_delete=models.PROTECT)


    def __str__(self):
        return self.problem_name

class Sent(models.Model):
    sent_problem = models.ForeignKey(Problem, on_delete=models.PROTECT)
    reflection = models.TextField()

    def __str__(self):
        return self.sent_problem.problem_name
