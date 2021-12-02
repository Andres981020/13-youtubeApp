import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { YoutubeResponse } from '../models/youtube.models';
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apiKey = 'AIzaSyBZ5VgZQqnIWMAc3TAlnS-tJ-KdvHltLzU';
  private playlist = 'UUuaPTYj15JSkETGnEseaFFg';
  private nextToken = 'EAAaBlBUOkNBVQ';

  constructor( private http: HttpClient) {

  }

  getVideos(){

    const url = `${ this.youtubeUrl }/playlistItems`

    const params = new HttpParams()
    .set('part', 'snippet')
    .set('maxResults', '10')
    .set('playlistId', this.playlist)
    .set('key', this.apiKey)
    .set('pageToken', this.nextToken)

    return this.http.get<YoutubeResponse>(url, { params })
      .pipe(
        map( res => {
          this.nextToken = res.nextPageToken;
          return res.items;
        }),
        map( items => items.map( video => video.snippet )
        )
      );
  }
}
