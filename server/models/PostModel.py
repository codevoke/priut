from .db import db


class PostModel(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    content = db.Column(db.Text, nullable=False)
    image = db.Column(db.String(80), default='no-photo', nullable=True)

    def json(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'image': self.image
        }

    def patch(self, new_title=None, new_content=None, new_image=None):
        if new_title:
            self.title = new_title
        if new_content:
            self.content = new_content
        if new_image:
            self.image = new_image
        self.save_to_db()

    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter_by(id=id).first()
    
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()